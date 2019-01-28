function isLetters(str){
	for (let i = 0; i < str.length; i++){
		if ((str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122)||(str.charCodeAt(i) >= 65 && str.charCodeAt(i) <= 90)){
			continue;
		} else {
			return false;
		}
	}
	return true;
}
function capFirstLetter(str){
	var newStr = "";
	for (let i = 0; i < str.length; i++){
		if (isLetters(str.charAt(i)) == false){
			newStr += str.charAt(i);
			continue;
		} else {
			if (i == 0||str.charAt(i-1) == " "){
				newStr += str.charAt(i).toUpperCase();
			} else {
				newStr += str.charAt(i);
			}
		}
	}
	return newStr;
}