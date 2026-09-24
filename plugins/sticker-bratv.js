import { sticker } from '../lib/sticker.js'
import axios from 'axios'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const fetchStickerVideo = async (text) => {
  const response = await axios.get(`https://skyzxu-brat.hf.space/brat-animated`, {
    params: { text },
    responseType: 'arraybuffer'
  })
  if (!response.data) throw new Error('Error al obtener el video de la api.')
  return response.data
}

const handler = async (m, { conn, text }) => {
  const react = async (text) => {
    try { await conn.sendMessage(m.chat, { react: { text: text, key: m.key } }) } catch {}
  }

  try {
    let userId = m.sender
    let packstickers = global.db.data.users[userId] || {}
    let texto1 = packstickers.text1 || '🍓 STRAWBERRY BOT'
    let texto2 = packstickers.text2 || 'Andreitap'

    text = m.quoted?.text || text
    if (!text) {
      await react('❌')
      return conn.sendMessage(m.chat, {
        text: `🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🍓\n𐔌 ꒱ ***BRATV*** 𐔌 ꒱ ⚠️\n\n── *📖 USO* ╏\n➛ Responde a un mensaje o escribe texto pe\n➛ Ejemplo:.bratv Hola\n━━━━━━━━━━━`
      }, { quoted: m })
    }

    await react('🕒')
    const videoBuffer = await fetchStickerVideo(text)
    const stickerBuffer = await sticker(videoBuffer, null, texto1, texto2)
    await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m })
    await react('✅')

  } catch (e) {
    await react('❌')
    conn.sendMessage(m.chat, {
      text: `🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🍓\n𐔌 ꒱ ***BRATV*** 𐔌 ꒱ ⚠️\n\n.⃟𖥔 ݁. 𖦹˙— \`\`ERROR\`\` —˙𖦹.❌꒷\n\n── *📝 AVISO* ╏\n❌ ➛ Se produjo un problema pe\n💡 ➛ Usa report para informarlo\n── *📊 DETALLE* ╏\n\`\`${e.message}\`\n━━━━━━━━━━━`
    }, { quoted: m })
  }
}

handler.tags = ['sticker']
handler.help = ['bratv <texto>']
handler.command = ['bratv']

export default handler