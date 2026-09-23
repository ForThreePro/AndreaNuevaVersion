import fs from 'fs'
import * as googleTTS from 'google-tts-api'
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'
import { tmpdir } from 'os'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        await m.reply(`🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🇨🇴\n🤖 *IA COLOMBIANA*\n\n*Ejemplo:* ${usedPrefix}ia ¿qué más pues parce?`)
        return
    }

    await m.react('⏳')

    try {
        // 1. PEDIR RESPUESTA A GEMINI BIEN COLOMBIANA PARCERA
        let promptColombiano = `${text}. Responde como una colombiana paisa bien parcera, coqueta y cariñosa. Usa jerga colombiana: parce, parcero, uy papasito, mi amor, que chimba, gonorrea (suave), mor. Máximo 2 líneas, bien sensual y divertida.`
        let aiUrl = `https://api.stellarwa.xyz/ai/gemini?text=${encodeURIComponent(promptColombiano)}&key=proyectsV2`
        let aiRes = await fetch(aiUrl)
        let aiJson = await aiRes.json()

        let respuesta = aiJson.result || aiJson.data || aiJson.response || "Uy papasito no te entendí parce, repítame pues mi amor"

        if(respuesta.length > 200) respuesta = respuesta.substring(0, 200) + "..."

        // 2. CONVERTIR A AUDIO - VOZ COLOMBIANA
        let url = googleTTS.getAudioUrl(respuesta, {
            lang: 'es', // español latino suena más paisa
            slow: false,
            host: 'https://translate.google.com',
            timeout: 10000,
        })

        let tmpFilePath = path.join(tmpdir(), `ia-co-${Date.now()}.opus`)

        await new Promise((resolve, reject) => {
            ffmpeg(url)
          .audioCodec('libopus')
          .toFormat('opus')
          .outputOptions([
                    '-avoid_negative_ts make_zero',
                    '-ac 1',
                    '-b:a 64k'
                ])
          .on('end', () => resolve(true))
          .on('error', (err) => reject(err))
          .save(tmpFilePath)
        })

        let audioBuffer = fs.readFileSync(tmpFilePath)

        await conn.sendMessage(m.chat, {
            audio: audioBuffer,
            mimetype: 'audio/ogg; codecs=opus',
            ptt: true
        }, { quoted: m })

        if (fs.existsSync(tmpFilePath)) fs.unlinkSync(tmpFilePath)
        await m.react('✅')

    } catch (e) {
        console.log(e)
        await m.react('❌')
        await m.reply(`🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 ⚠️\n\n❌ Error parce: ${e.message}`)
    }
}

handler.help = ['ia <texto>']
handler.tags = ['ai']
handler.command = ['ia', 'bot', 'voz']
handler.register = false

export default handler