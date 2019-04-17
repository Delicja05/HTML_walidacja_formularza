function ukryj() {
	document.getElementById('index1').style.display = 'none';
	document.getElementById('index2').style.display = 'none';
	document.getElementById('index3').style.display = 'none';
}

function wymienTresc(id) {
	ukryj();
	document.getElementById(id).style.display = 'block';
}

function wypisz() {
	if(document.getElementById("progressBar").value == 100){
		alert('Dane poprawne');
	}
	else {
		alert('Błędne dane');
	}
}

var kolejne = [];
var lampki = ['lampka1', 'lampka2', 'lampka3', 'lampka4', 'lampka5'];

let progressBarStatus = {
	'check3':0,
	'inputImie':0,
	'inputNazwisko':0,
	'inputMiasto':0,
	'inputKod':0,
	'inputWojewodztwo':0,
	'inputinputMail':0,
	'inputIP':0,
	'inputURL':0,
	'inputHaslo':0,	
}

function zaznaczony(elem, lampkanazwa) {
	var elem = document.getElementById(elem);
	var lampka = document.getElementById(lampkanazwa);
	var ileZielonych = 0;
	var ileCzerwonych = 0;
	var i=0

	for(i;i<lampki.length;i++){
		if(document.getElementById(lampki[i]).style.backgroundColor == "green"){
			ileZielonych +=1;
		}
		if(document.getElementById(lampki[i]).style.backgroundColor == "red"){	
			ileCzerwonych +=1;
		}
	}

	if(ileZielonych >=3){
		if(elem.checked == true){
			kolejne.push(lampka);
			lampka.style.background="red";
			ileCzerwonych +=1;

			if(progressBarStatus['check3']==1){
				progressBar(-10);
			}
			progressBarStatus['check3']=0;			
		}
		else if(elem.checked == false){
			if(ileZielonych==3 && lampka.style.backgroundColor=="green" && ileCzerwonych!=0){
				kolejne[kolejne.length-1].style.background="green";
				kolejne.pop();
				ileCzerwonych -=1;
			}			
			if(ileZielonych==3 && lampka.style.backgroundColor=="red" && ileCzerwonych==1){
				kolejne.splice(kolejne.indexOf(lampkanazwa), 1);
				// kolejne = kolejne.filter(l => l !== lampkanazwa);
				ileCzerwonych -=1;

				if(progressBarStatus['check3']==0){
					progressBar(10);
				}
				progressBarStatus['check3']=1;
			}
			if(ileZielonych==3 && lampka.style.backgroundColor=="green" && ileCzerwonych==0){

				if(progressBarStatus['check3']==1){
					progressBar(-10);
				}
				progressBarStatus['check3']=0;
			}

			lampka.style.background="white";			
		}
	}
	else if (ileZielonych <3){
		if(elem.checked == true){
			lampka.style.background="green";
		}
		else if(elem.checked == false){
			lampka.style.background="white";
		}
	}

	ileZielonych = 0;

	for(i=0;i<lampki.length;i++){
		if(document.getElementById(lampki[i]).style.backgroundColor == "green"){
			ileZielonych +=1;
		}
	}

	if(ileZielonych==3 && ileCzerwonych==0){
		if(progressBarStatus['check3']!=1){
			progressBar(10);	
		}
		progressBarStatus['check3']=1;
	}
}	

function progressBar(value){
	var progres = document.getElementById('progressBar');
	progres.value += value;	
}

function wypelniony(elem, lampka){
	var elem = document.getElementById(elem);
	var lampka = document.getElementById(lampka);

	if(elem.value == "Wybierz..."){
		lampka.style.background="white";
		if(progressBarStatus['inputWojewodztwo']==1){
			progressBar(-10);
		}
		progressBarStatus['inputWojewodztwo']=0;
	}
	else {
		lampka.style.background="green";
		if(progressBarStatus['inputWojewodztwo']!=1){
			progressBar(10);	
		}
		progressBarStatus['inputWojewodztwo']=1;
	}
}

function dash(){
	var elem = document.getElementById("inputKod");
	var pattern = elem.getAttribute("pattern");

	if (elem.value.length ==2){
		elem.value = elem.value + '-';
	}
}

function checkPattern(elemNazwa, lampka){
	var elem = document.getElementById(elemNazwa);
	var lampka = document.getElementById(lampka);
	var pattern = elem.getAttribute("pattern");

	if(elem.value.match(pattern) && elem.value.match(pattern)[0] == elem.value){
		lampka.style.background="green";
		if(progressBarStatus[elemNazwa]!=1){
			progressBar(10);
		}
		progressBarStatus[elemNazwa]=1;
	}
	else if(elem.value != ""){
		lampka.style.background="red";
		if(progressBarStatus[elemNazwa]==1){
			progressBar(-10);
		}
		progressBarStatus[elemNazwa]=0;
	}
	else {
		lampka.style.background="white";
	}
}

function checkHaslo(){
	var elemH = document.getElementById('inputHaslo').value;
	var elemM = document.getElementById('passwordPower');
	var duza = 0;
	var mala = 0;
	var cyfra = 0;
	var i =0;

	for(i; i < elemH.length; i++){
		if((elemH.charAt(i) >= 'A') && (elemH.charAt(i) <= 'Z')){
			duza=1;
		}
		if((elemH.charAt(i) >= 'a') && (elemH.charAt(i) <= 'z')){
			mala=1;
		}
		if((elemH.charAt(i) >= '0') && (elemH.charAt(i) <= '9')){
			cyfra=1;
		}
	}

	if(elemH.length>=8 && duza==1 && mala==1 && cyfra==1){
		elemM.value=100;
	}
	if(elemH.length>4 && elemH.length<8 && (duza==1 || mala==1 || cyfra==1)){
		elemM.value=50;
	}
	if(elemH.length<=4){
		elemM.value=20;
	}
}
