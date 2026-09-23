import axios from 'axios'

let handler = async (m, { conn, text }) => {
    let user = `@${m.sender.split('@')[0]}`
    let groupName = m.isGroup? (await conn.groupMetadata(m.chat)).subject : 'Privado'
    const APIKEY = 'proyectsV2'

    const react = async (text) => {
        try { await conn.sendMessage(m.chat, { react: { text: text, key: m.key } }) } catch {}
    }

    if (!text) {
        await react('❌')
        let error = `🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🍓
𐔌 ꒱ ***YOUTUBE SEARCH*** 𐔌 ꒱ ⚠️

.⃟𖥔 ݁. 𖦹˙— \`\`ERROR\`\` —˙𖦹.❌꒷

── *📝 AVISO* ╏
❌ ➛ ¿Qué deseas buscar en YouTube pe?

── *💡 EJEMPLO* ╏
➛ ytsearch Bad Bunny

━━━━━━━━━━━`
        return conn.sendMessage(m.chat, { text: error }, { quoted: m })
    }

    await react('🔍')
    await m.reply(`🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🍓
𐔌 ꒱ ***YOUTUBE SEARCH*** 𐔌 ꒱ ⏳

.⃟𖥔 ݁. 𖦹˙— \`\`BUSCANDO\`\` —˙𖦹.📺꒷

── *📊 ESTADO* ╏
🔍 ➛ Buscando: *${text}*
⏳ ➛ Conectando a StellarWA...

━━━━━━━━━━━`)

    try {
        let { data } = await axios.get(`https://api.stellarwa.xyz/search/yt?query=${encodeURIComponent(text)}&key=${APIKEY}`)

        if (!data.status ||!data.result || data.result.length === 0) {
            await react('❌')
            let vacio = `🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🍓
𐔌 ꒱ ***YOUTUBE SEARCH*** 𐔌 ꒱ 📭

.⃟𖥔 ݁. 𖦹˙— \`\`SIN RESULTADOS\`\` —˙𖦹.❌꒷

── *📝 AVISO* ╏
📭 ➛ No se encontraron resultados para: *${text}* pe

━━━━━━━━━━━`
            return conn.sendMessage(m.chat, { text: vacio }, { quoted: m })
        }

        let res = data.result.slice(0, 5).map((v, i) => 
`── *${i+1}* ╏
📺 ➛ *${v.title}*
⏱️ ➛ Duración: *${v.duration}*
👁️ ➛ Vistas: *${v.views}*
👤 ➛ Canal: *${v.author}*
🔗 ➛ ${v.url}`).join('\n\n')

        let caption = `🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🍓
𐔌 ꒱ ***YOUTUBE SEARCH*** 𐔌 ꒱ ✅

.⃟𖥔 ݁. 𖦹˙— \`\`TOP 5 RESULTADOS\`\` —˙𖦹.📺꒷

── *📊 BÚSQUEDA* ╏
🔎 ➛ ${text}

${res}

━━━━━━━━━━━
── *📋 INFORMACIÓN* ╏
👤 ➛ Solicitado por: ${user}
👥 ➛ Grupo: *${groupName}*

── *💡 TIP* ╏
➛ Usa: ytmp4 + link
➛ Usa: ytmp3 + link

━━━━━━━━━━━`

        await conn.sendMessage(m.chat, { text: caption, mentions: [m.sender] }, { quoted: m })
        await react('✅')
    } catch (e) { 
        console.error(e)
        await react('❌')
        let error = `🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🍓
𐔌 ꒱ ***YOUTUBE SEARCH*** 𐔌 ꒱ ⚠️

.⃟𖥔 ݁. 𖦹˙— \`\`ERROR\`\` —˙𖦹.❌꒷

── *📝 AVISO* ╏
❌ ➛ Error al conectar con StellarWA pe
🔧 ➛ Intenta más tarde

━━━━━━━━━━━`
        conn.sendMessage(m.chat, { text: error }, { quoted: m })
    }
}

handler.help = ['yts <busqueda>']
handler.tags = ['búsqueda']
handler.command = /^(yts|ytsearch)$/i
export default handler