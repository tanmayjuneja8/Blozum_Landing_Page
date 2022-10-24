  // Close modal1 on escape key
  $(document).keyup(function(e) {
    if (e.key === "Escape") {
      $('.modal1').removeClass('modal1-show');
      $('.content').removeClass('content-blurred');
      $('body').removeClass('no-scroll');
    }
  });

  // Close modal on escape key
  $(document).keyup(function(e) {
    if (e.key === "Escape") {
      $('.modal').removeClass('modal-show');
      $('.content').removeClass('content-blurred');
      $('body').removeClass('no-scroll');
    }
  });

  $(function(){

    // Provider card slider
    $('.slider').flickity({
      pauseAutoPlayOnHover: false,
      prevNextButtons: false,
      cellAlign: 'center',
      draggable:  false,
      freeScroll: false,
      wrapAround: true,
      pageDots: false,
      autoPlay: 3000,
    });

    // Imbox zero slider
    $('.zero-slider').flickity({
      pauseAutoPlayOnHover: false,
      prevNextButtons: false,
      cellAlign: 'center',
      freeScroll: false,
      wrapAround: false,
      draggable: false,
      pageDots: false,
      autoPlay: 3000,
      fade: true,
    });

    // Open & close modal
    $('.modal-toggle').click(function(){
      $('.modal').toggleClass('modal-show');
      $('.content').toggleClass('content-blurred');
      $('body').toggleClass('no-scroll');
    });

    $('.modal-toggle1').click(function(){
      $('.modal1').toggleClass('modal1-show');
      $('.content').toggleClass('content-blurred');
      $('body').toggleClass('no-scroll');
    });

    // Feather icons
    feather.replace()

    // ScrollReveal
    ScrollReveal().reveal('.hero, .title, .screen, .features, .cards, .zero-slider', {
      distance: '40px',
      duration: 2000,
      mobile: false,
      reset: false,
      opacity: 0
    });

  });
    import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js'

    // If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
    import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js'

    // Add Firebase products that you want to use
    import { getAuth } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js'
    import { getFirestore, getDocs, collection, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js'
    import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
      const firebaseConfig = {
  apiKey: "AIzaSyDfeNYGpnsrDHyAks9q-72HRY5OXP8tQPg",
  authDomain: "game-referral.firebaseapp.com",
  databaseURL: "https://game-referral-default-rtdb.firebaseio.com",
  projectId: "game-referral",
  storageBucket: "game-referral.appspot.com",
  messagingSenderId: "1017038419798",
  appId: "1:1017038419798:web:f95c03206b0b620fe9c8f7",
  measurementId: "G-JWD97LTK5T"
};
firebase.initializeApp(firebaseConfig);

(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

const facebookBtn = document.getElementById("fb");
    const twitterBtn = document.getElementById("twitter");
    const linkedinBtn = document.getElementById("linkedin");
    const whatsappBtn = document.getElementById("wa");

  let postUrl = "https://slotgame.vercel.app/";
  let postTitle = encodeURI("Hi everyone, please check this out: ");

  facebookBtn.setAttribute(
    "href",
    `https://www.facebook.com/sharer.php?u=${postUrl}`
  );

  twitterBtn.setAttribute(
    "href",
    `https://twitter.com/share?url=${postUrl}&text=${postTitle}`
  );

  linkedinBtn.setAttribute(
    "href",
    `https://www.linkedin.com/shareArticle?url=${postUrl}&title=${postTitle}`
  );

  whatsappBtn.setAttribute(
    "href",
    `https://wa.me/?text=${postTitle} ${postUrl}`
  );

// reference your database
  const app = initializeApp(firebaseConfig);
  const db = firebase.database();
var contactFormDB = firebase.database().ref("Game-Referral");
document.getElementById("referralForm").addEventListener("submit", submitForm);
function removeCommas(word){
		return word.replace(/,/g, '');
	}
// option to insert referral code -> generate unique referral code -> show referral code after login -> copy referral code -> 
let alphaNumeric = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', '1','2','3','4','5','6','7','8','9'];
function refCodeGen(){
let picks = [];

								// loop through alphabets array and pick an alphabet with the generated index
								for (let i = 0; i < 6; i++) {
									let key = Math.floor(Math.random()*alphaNumeric.length);
									picks.push(alphaNumeric[key]);
								}								

								// convert selected alphabets array to string and remove seperating commas
								let letters1 = picks.toString();
                                letters1 = removeCommas(letters1);
                                return letters1;
}
const CopyToClipboard = (id) => {
    navigator.clipboard.writeText
                (id);
}
async function submitForm(e) {
  e.preventDefault();

  var firstName = getElementVal("firstName");
  var emailid = getElementVal("emailid");
  var number = getElementVal("number");
var referral = getElementVal("referral");

// check the user name with the referral code - "referral".

var uniqueCode = firstName.substring(0, 3).toUpperCase() + refCodeGen();
  var query = firebase.database().ref("Game-Referral");
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      if (referral === childData.referral) {
              const db = getDatabase();
              let increment = childData.count + 1;
              set(ref(db, 'Game-Referral/'+key), {
                firstName: childData.firstName,
                emailid:childData.emailid,
                number:childData.number,
                referral:childData.referral,
                count: increment,
              });
            }
  });
});
  saveMessages(firstName, emailid, number, uniqueCode);
  // reset the form
  document.getElementById("referralForm").reset();
  document.getElementsByClassName("modal1-title")[0].innerHTML = "Your Unique Referral Code: " + uniqueCode;
  //  copy referral code message
    var text = "Play this game and use my Blozum referral code to win cash and exciting prizes like I did on the Blozum website. Referral Code: "+uniqueCode+" Blozom Website: "+"<link>";
    // document.getElementsByClassName("modal1-body")[0].innerHTML = "<p>Play this game and use my Blozum referral code to win cash and exciting prizes like I did on the Blozum website.<br><br> Referral Code: "+uniqueCode+"<br> Blozum Website: "+"<link></p>";
    const btn = document.getElementById("referral_button");
    btn.onclick = CopyToClipboard(text);
    setTimeout(function () {
        document.getElementsByClassName("modal-close modal-toggle")[0].click();
        document.getElementsByClassName("modal1-close modal-toggle1")[0].click();
        }, 500);
    /*const btn2 = document.getElementById("take_me_back");
    btn2.onclick = function() {document.getElementsByClassName('modal1-close modal-toggle1')[0].click();}*/
  
}




const saveMessages = (firstName, emailid, number, referral) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    firstName: firstName,
    emailid: emailid,
    number: number,
    referral : referral,
    count : 0
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};