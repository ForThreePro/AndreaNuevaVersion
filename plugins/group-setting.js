let handler = async (m, { conn, command }) => {
    const react = async (text) => {
        try { await conn.sendMessage(m.chat, { react: { text: text, key: m.key } }) } catch {}
    }

    let isClose
    let estado
    let icon
    let reactEmoji

    if (command === 'abrir') {
        isClose = 'not_announcement'
        estado = 'ABIERTO'
        icon = '🔓'
        reactEmoji = '🔓'
    } 
    if (command === 'cerrar') {
        isClose = 'announcement'
        estado = 'CERRADO'
        icon = '🔒'
        reactEmoji = '🔒'
    }

    try {
        await conn.groupSettingUpdate(m.chat, isClose)
        await react(reactEmoji)

        let msg = `🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🍓
𐔌 ꒱ ***ESTADO DEL GRUPO*** 𐔌 ꒱ ✅

.⃟𖥔 ݁. 𖦹˙— \`\`ACTUALIZADO\`\` —˙𖦹.${icon}꒷

── *📊 INFORMACIÓN* ╏
${icon} ➛ Estado: *${estado}* pe
👑 ➛ Por: @${m.sender.split('@')[0]}

── *📝 NOTA* ╏
${command === 'cerrar' 
? '🔒 ➛ Solo admins pueden enviar mensajes pe' 
: '💬 ➛ Todos pueden enviar mensajes pe'}

━━━━━━━━━━━`
        await conn.sendMessage(m.chat, { text: msg, mentions: [m.sender] }, { quoted: m })
    } catch (e) {
        await react('❌')
        let error = `🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🍓
𐔌 ꒱ ***ESTADO DEL GRUPO*** 𐔌 ꒱ ⚠️

.⃟𖥔 ݁. 𖦹˙— \`\`ERROR\`\` —˙𖦹.❌꒷

── *📝 AVISO* ╏
❌ ➛ No se pudo cambiar el estado pe
🔒 ➛ ¿Soy admin del grupo?

━━━━━━━━━━━`
        conn.sendMessage(m.chat, { text: error }, { quoted: m })
    }
}

handler.help = ['abrir', 'cerrar']
handler.tags = ['grupos']
handler.command = ['abrir', 'cerrar']
handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler