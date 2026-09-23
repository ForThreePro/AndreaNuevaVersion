let handler = async (m, { conn, args }) => {
  let chat = global.db.data.chats[m.chat]
  if (!chat) global.db.data.chats[m.chat] = {}

  let textoCmd = m.text.toLowerCase()
  let type = ''
  if (textoCmd.includes('welcome')) type = 'welcome'
  if (textoCmd.includes('bye')) type = 'bye'
  if (textoCmd.includes('kick')) type = 'kick'

  let text = args.join(' ')
  let key = `custom${type.charAt(0).toUpperCase() + type.slice(1)}`

  const react = async (text) => {
    try { await conn.sendMessage(m.chat, { react: { text: text, key: m.key } }) } catch {}
  }

  // SET
  if (textoCmd.startsWith('set')) {
    await react('📝')
    if (!text) {
      let uso = `🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🍓
𐔌 ꒱ ***MENSAJE ${type.toUpperCase()}*** 𐔌 ꒱ 📝

.⃟𖥔 ݁. 𖦹˙— \`\`FORMATO\`\` —˙𖦹.✏️꒷

── *📖 USO* ╏
➛ Envía: <texto del mensaje>

── *💡 VARIABLES* ╏
👤 ➛ @user = Menciona al usuario
👥 ➛ @group = Nombre del grupo
📄 ➛ @desc = Descripción del grupo

── *💡 EJEMPLO* ╏
➛ Bienvenido @user a @group

━━━━━━━━━━━`
      return conn.sendMessage(m.chat, { text: uso }, { quoted: m })
    }

    chat[key] = text
    let ok = `🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🍓
𐔌 ꒱ ***MENSAJE ${type.toUpperCase()}*** 𐔌 ꒱ ✅

.⃟𖥔 ݁. 𖦹˙— \`\`GUARDADO\`\` —˙𖦹.📝꒷

── *📊 INFORMACIÓN* ╏
✅ ➛ Mensaje de *${type}* guardado pe

── *📝 VISTA PREVIA* ╏
💬 ➛ ${text}

━━━━━━━━━━━`
    return conn.sendMessage(m.chat, { text: ok }, { quoted: m })
  }

  // DEL
  if (textoCmd.startsWith('del')) {
    await react('🗑️')
    if (!chat[key]) {
      let vacio = `🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🍓
𐔌 ꒱ ***MENSAJE ${type.toUpperCase()}*** 𐔌 ꒱ 📭

.⃟𖥔 ݁. 𖦹˙— \`\`NO CONFIGURADO\`\` —˙𖦹.❌꒷

── *📝 AVISO* ╏
📭 ➛ No hay un mensaje de *${type}* personalizado pe

━━━━━━━━━━━`
      return conn.sendMessage(m.chat, { text: vacio }, { quoted: m })
    }

    delete chat[key]
    let del = `🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🍓
𐔌 ꒱ ***MENSAJE ${type.toUpperCase()}*** 𐔌 ꒱ ✅

.⃟𖥔 ݁. 𖦹˙— \`\`ELIMINADO\`\` —˙𖦹.🗑️꒷

── *📊 INFORMACIÓN* ╏
🗑️ ➛ Mensaje de *${type}* eliminado pe
✅ ➛ Volverá al mensaje por defecto

━━━━━━━━━━━`
    return conn.sendMessage(m.chat, { text: del }, { quoted: m })
  }
}

handler.help = ['setwelcome', 'setbye', 'setkick', 'delwelcome', 'delbye', 'delkick']
handler.tags = ['configuración']
handler.command = /^(setwelcome|setbye|setkick|delwelcome|delbye|delkick)$/i
handler.group = true
handler.admin = true
export default handler