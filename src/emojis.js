'use strict';

const emojis = {
	"sir": "( ಠ ͜ʖರೃ)",
	"zoidberg": "(\\/)(°,,,°)(\\/)",
	"eyes": "ಠ_ಠ",
	"sunglasses": "(⌐■_■)",
	"do it": "(☞ﾟヮﾟ)☞",
	"flip": "(╯°□°）╯︵ ┻━┻",
	"unflip": "┬──┬◡ﾉ(° -°ﾉ)",
	"y u no": "ლ(ಠ益ಠლ)"
}

function getEmoji(emojiName) {
	return emojis[emojiName] || undefined;
} 

module.exports = {
	getEmoji: getEmoji,
	all: emojis
}