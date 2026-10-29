(() => {
  "use strict";
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");
  const modalEmoji = document.getElementById("modal-emoji");
  const modalAction = document.getElementById("modal-action");
  const toast = document.getElementById("toast");
  let toastTimer;
  let cakeSlices = 1;
  let audioContext = null;
  let musicOn = false;
  let musicTimer = null;
  let noteIndex = 0;

  const messages = {
    roast: {emoji:"🔥🐼",title:"Roast Corner 😂",text:"Didi, aap paida choti hui thi ya chal chal ke ghis gayi?! 😭😂\n\nFree Fire me aapko job mil sakta hai. Konsa pata hai? Bot section 😂📱\n\nAur acting ki badshah ho badshah 😂👑",button:"Chalo niklo dusre pe ❤️✨"},
    caring: {emoji:"❤️🫶",title:"Caring Corner",text:"You are bot!! 🫶\n\nAap strong ho, and supportive bhi.\n\nHamesha khush raho, healthy raho—hum aapke saath hain. 💗",button:"Chalo niklo dusre pe ❤️✨"},
    cake: {emoji:"🎂🐼",title:"Cake Time!",text:"Virtual cake aapke liye! 🍰\n\nAche se khao, virtual sahi but it will be unlimited and tasty ✨",button:"Get another slice 🍰"},
    gift: {emoji:"🎁❤️✨",title:"Surprise Gift!",text:"Surpriseee, Nubdi! 🐼❤️✨\n\nAapki life galaxies jitni beautiful, stars jitni bright aur cake jitni sweet ho.\n\nHappy Birthday! Aaj ka din sirf aapke naam. ✨",button:"Open another wish 💌"},
    final: {emoji:"🌌❤️✨",title:"One Last Message",text:"Didi, aapki har achhi wish poori ho, life mein khushiyan aur success aaye, aur aap hamesha apni cute si smile ke saath shine karti raho.\n\nHappy Birthday, Kousar Didi! 🐼🎂❤️✨",button:"Made with love ❤️"}
  };
  function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2800);}
  function openModal(key){
    const item=messages[key]; if(!item)return;
    modalEmoji.textContent=item.emoji;modalTitle.textContent=item.title;modalText.textContent=item.text;modalAction.textContent=item.button;
    modal.dataset.key=key;modal.classList.add("open");modal.setAttribute("aria-hidden","false");modalAction.focus();
  }
  function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");}
  document.addEventListener("click",event=>{
    const opener=event.target.closest("[data-open]");if(opener)openModal(opener.dataset.open);
    const tile=event.target.closest("[data-gallery]");
    if(tile){modalEmoji.textContent=tile.textContent.trim().split("\n")[0];modalTitle.textContent=tile.dataset.gallery;modalText.textContent="A cute little (bauni si) birthday for you! Ye actually photos ke liye socha tha but photos and time nahi tha, so next time. ❤️✨";modalAction.textContent="Bahut Acha! 🐼";modal.dataset.key="gallery";modal.classList.add("open");modal.setAttribute("aria-hidden","false");}
  });
  document.getElementById("closeModal").addEventListener("click",closeModal);
  modal.addEventListener("click",event=>{if(event.target===modal)closeModal();});
  document.addEventListener("keydown",event=>{if(event.key==="Escape")closeModal();});
  modalAction.addEventListener("click",()=>{
    const key=modal.dataset.key;
    if(key==="cake"){cakeSlices+=1;modalEmoji.textContent="🍰😋";modalTitle.textContent=`Cake slice #${cakeSlices}!`;modalText.textContent="Ek aur lo, aur khush hojao (bauni)! 😂❤️";modalAction.textContent="One more? 🍰";}
    else if(key==="gift"){modalEmoji.textContent="💌✨";modalTitle.textContent="Bonus Wish!";modalText.textContent="Aap hamesha loved, valued aur happy feel karo. Keep shining, Didi! ❤️✨🐼";modalAction.textContent="Chalo Niklo agle pe ❤️";modal.dataset.key="giftDone";}
    else{closeModal();showToast("Happy Birthday, Kousar Didi! 🐼🎂❤️✨");}
  });
  const musicBtn=document.getElementById("musicBtn");
  function playNote(freq,duration=.22){
    if(!audioContext)audioContext=new(window.AudioContext||window.webkitAudioContext)();
    const osc=audioContext.createOscillator(),gain=audioContext.createGain();osc.type="sine";osc.frequency.value=freq;
    gain.gain.setValueAtTime(.0001,audioContext.currentTime);gain.gain.exponentialRampToValueAtTime(.07,audioContext.currentTime+.02);gain.gain.exponentialRampToValueAtTime(.0001,audioContext.currentTime+duration);
    osc.connect(gain);gain.connect(audioContext.destination);osc.start();osc.stop(audioContext.currentTime+duration+.02);
  }
  const melody=[523.25,659.25,783.99,659.25,587.33,698.46,783.99,1046.5];
  musicBtn.addEventListener("click",async()=>{
    if(musicOn){musicOn=false;clearInterval(musicTimer);musicBtn.textContent="♫ Music: Off";showToast("Birthday chime paused 🔇");return;}
    try{if(!audioContext)audioContext=new(window.AudioContext||window.webkitAudioContext)();if(audioContext.state==="suspended")await audioContext.resume();musicOn=true;musicBtn.textContent="♫ Music: On · Pause";playNote(melody[noteIndex++%melody.length]);musicTimer=setInterval(()=>{if(musicOn)playNote(melody[noteIndex++%melody.length]);},330);showToast("Birthday chime playing 🎵");}
    catch(error){showToast("Audio isn't supported in this browser.");}
  });
})();
