//==================================
// LOADER
//==================================
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.classList.add("hide");
    }, 1800);
});

//==================================
// MAQUINA DE ESCRIBIR
//==================================

const typing = document.getElementById("typing");
const text = `Hola, Camila.
Si estás leyendo esto, significa que por fin pude entregarte el dibujo.
No será la obra de un gran artista, 
pero sí lleva algo que para mí vale mucho más: tiempo, dedicación y cariño.
Me gusto pasar tiempo contigo el 20 de julio.
Aunque fue un rato, fue muy agradable.
Me gusta cómo me siento cuando hablamos.
Y me encanta descubrir, poco a poco, la persona que eres.
No quiero apresurar nada.
Solo quiero seguir conociéndote y disfrutar de cada momento que compartamos.
Espero que este pequeño detalle te saque una sonrisa, 
así como tú ya has sacado varias en mí. ❤️`;

let index = 0;
function writeText(){
    if(index < text.length){
        typing.innerHTML += text.charAt(index);
        index++;
        setTimeout(writeText,40);
    }
}

//==================================
// OBSERVER
//==================================

const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{
    threshold:.25
});

document.querySelectorAll(".card").forEach(card=>{
    observer.observe(card);
});

//==================================
// ACTIVAR CARTA
//==================================

const typingObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            if(index===0){
                writeText();
            }
        }
    });
},{
    threshold:.5
});

typingObserver.observe(document.getElementById("typing"));

//==================================
// BOTON FINAL
//==================================

const heartButton = document.getElementById("heartButton");

heartButton.addEventListener("click",()=>{
    heartButton.innerHTML="❤️ Gracias por llegar a mi vida ❤️";
    heartButton.style.background="#ff4f8b";
    heartButton.style.transform="scale(1.08)";
});

//==================================
// EFECTO PARALLAX HEADER
//==================================

window.addEventListener("scroll",()=>{
    const header=document.querySelector("header");
    let value=window.scrollY;
    header.style.transform=`translateY(${value*0.18}px)`;
});

//==================================
// BOTONES
//==================================

document.querySelectorAll("button").forEach(btn=>{
    btn.addEventListener("mouseenter",()=>{
        btn.style.boxShadow="0 0 35px rgba(255,150,200,.8)";
    });

    btn.addEventListener("mouseleave",()=>{
        btn.style.boxShadow="0 0 18px rgba(255,122,168,.5)";
    });
});

//==================================
// SALUDO SEGÚN HORA
//==================================

const title=document.querySelector("header h1");
const hour=new Date().getHours();

if(hour<12){
    title.innerHTML="Buenos días Camila 🌸";
}
else if(hour<19){
    title.innerHTML="Hola Camila 🌸";
}
else{
    title.innerHTML="Buenas noches Camila 🌙";
}

//==================================
// PEQUEÑO EFECTO EN IMAGENES
//==================================

document.querySelectorAll("img").forEach(img=>{
    img.addEventListener("click",()=>{
        img.animate([
            {transform:"scale(1)"},
            {transform:"scale(1.05)"},
            {transform:"scale(1)"}
        ],{
            duration:500
        });
    });
});

//==================================
// MENSAJE EN CONSOLA
//==================================
console.log("%cPara Camila ❤️","font-size:24px;color:#ff7aa8;font-weight:bold;");
console.log("Hecho con mucho cariño por Ignacio.");

//========================================
// CANVAS ESTRELLAS
//========================================

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let w;
let h;

function resizeCanvas(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize",resizeCanvas);

//========================================
// ESTRELLAS
//========================================

const stars = [];
for(let i=0;i<220;i++){
    stars.push({
        x:Math.random()*w,
        y:Math.random()*h,
        r:Math.random()*2+0.4,
        a:Math.random(),
        s:Math.random()*0.015+0.003
    });
}

function drawStars(){
    ctx.clearRect(0,0,w,h);
    stars.forEach(star=>{
        star.a += star.s;
        if(star.a>1 || star.a<0){
            star.s*=-1;
        }
        ctx.beginPath();
        ctx.fillStyle=`rgba(255,255,255,${star.a})`;
        ctx.arc(star.x,star.y,star.r,0,Math.PI*2);
        ctx.fill();
    });
}

function animateStars(){
    drawStars();
    requestAnimationFrame(animateStars);
}

animateStars();

//========================================
// ESTRELLA FUGAZ
//========================================

function shootingStar(){
    let x=Math.random()*w*0.7;
    let y=Math.random()*250;
    let length=160;
    let opacity=1;
    function draw(){
        ctx.beginPath();
        ctx.strokeStyle=`rgba(255,255,255,${opacity})`;
        ctx.lineWidth=2;
        ctx.moveTo(x,y);
        ctx.lineTo(x+length,y+length);
        ctx.stroke();
        x+=18;
        y+=18;
        opacity-=0.02;
        if(opacity>0){
            requestAnimationFrame(draw);
        }
    }
    draw();
}
setInterval(shootingStar,7000);

//========================================
// SAKURA
//========================================

for(let i=0;i<35;i++){
    createPetal();
}

function createPetal(){
    const petal=document.createElement("div");
    petal.className="petal";
    petal.innerHTML="🌸";
    petal.style.left=Math.random()*100+"vw";
    petal.style.top="-10vh";
    petal.style.fontSize=(16+Math.random()*18)+"px";
    petal.style.position="fixed";
    petal.style.pointerEvents="none";
    petal.style.zIndex="100";
    petal.style.opacity=Math.random();
    petal.style.transition="transform linear";
    document.body.appendChild(petal);
    const duration=9000+Math.random()*6000;
    let start=null;
    function fall(time){
        if(!start) start=time;
        let progress=time-start;
        let percent=progress/duration;
        petal.style.transform=
        `translate(${Math.sin(percent*10)*70}px,
        ${percent*(h+200)}px)
        rotate(${percent*900}deg)`;

        if(percent<1){
            requestAnimationFrame(fall);
        }else{
            petal.remove();
            createPetal();
        }
    }
    requestAnimationFrame(fall);
}

//========================================
// CORAZONES AL TOCAR
//========================================

document.addEventListener("click",function(e){
    for(let i=0;i<8;i++){
        heart(e.clientX,e.clientY);
    }
});

function heart(x,y){
    const h=document.createElement("div");
    h.innerHTML="❤️";
    h.style.position="fixed";
    h.style.left=x+"px";
    h.style.top=y+"px";
    h.style.pointerEvents="none";
    h.style.fontSize=(14+Math.random()*12)+"px";
    h.style.zIndex="999";
    document.body.appendChild(h);
    let posY=y;
    let posX=x;
    let opacity=1;
    let angle=Math.random()*Math.PI*2;
    let speed=2+Math.random()*2;
    function animate(){
        posY-=speed;
        posX+=Math.cos(angle);
        opacity-=0.018;
        h.style.left=posX+"px";
        h.style.top=posY+"px";
        h.style.opacity=opacity;
        h.style.transform=`scale(${opacity+0.4})`;
        if(opacity>0){
            requestAnimationFrame(animate);
        }else{
            h.remove();
        }
    }
    animate();
}

//========================================
// PARTÍCULAS BOTÓN FINAL
//========================================

heartButton.addEventListener("mouseenter",()=>{
    for(let i=0;i<18;i++){
        particle();
    }
});

function particle(){
    const p=document.createElement("div");
    p.innerHTML="✨";
    p.style.position="fixed";
    p.style.left=(window.innerWidth/2-80+Math.random()*160)+"px";
    p.style.top=(window.innerHeight-140+Math.random()*60)+"px";
    p.style.fontSize=(10+Math.random()*10)+"px";
    p.style.pointerEvents="none";
    p.style.zIndex="999";
    document.body.appendChild(p);
    let opacity=1;
    let y=parseFloat(p.style.top);
    function move(){
        opacity-=0.03;
        y-=1.6;
        p.style.opacity=opacity;
        p.style.top=y+"px";
        if(opacity>0){
            requestAnimationFrame(move);
        }else{
            p.remove();
        }
    }
    move();
}

//========================================
// LLUVIA DE CORAZONES
//========================================

function rainHeart(){
    const heart=document.createElement("div");
    heart.innerHTML="❤️";
    heart.style.position="fixed";
    heart.style.left=Math.random()*window.innerWidth+"px";
    heart.style.top="-30px";
    heart.style.fontSize=(18+Math.random()*20)+"px";
    heart.style.pointerEvents="none";
    heart.style.zIndex="5000";
    document.body.appendChild(heart);
    let y=-30;
    let x=parseFloat(heart.style.left);
    let speed=2+Math.random()*3;
    let rotate=Math.random()*360;
    function fall(){
        y+=speed;
        x+=Math.sin(y/40);
        rotate+=2;
        heart.style.top=y+"px";
        heart.style.left=x+"px";
        heart.style.transform=`rotate(${rotate}deg)`;
        if(y<window.innerHeight+40){
            requestAnimationFrame(fall);
        }else{
            heart.remove();
        }
    }
    fall();
}

//========================================
// EXPLOSIÓN FINAL
//========================================

function celebration(){
    for(let i=0;i<180;i++){
        setTimeout(()=>{
            rainHeart();
        },i*35);
    }
}

//========================================
// BOTÓN FINAL
//========================================

heartButton.addEventListener("click",()=>{
    celebration();
    if(navigator.vibrate){
        navigator.vibrate([120,60,120]);
    }
    setTimeout(showEnding,2000);
});

//========================================
// MENSAJE FINAL
//========================================

function showEnding(){
    const overlay=document.createElement("div");
    overlay.style.position="fixed";
    overlay.style.inset="0";
    overlay.style.background="rgba(5,10,20,.92)";
    overlay.style.display="flex";
    overlay.style.flexDirection="column";
    overlay.style.justifyContent="center";
    overlay.style.alignItems="center";
    overlay.style.zIndex="10000";
    overlay.style.padding="30px";
    overlay.style.textAlign="center";
    overlay.style.animation="fadeIn 1s";
    overlay.innerHTML=`
    <h1 style="
    color:white;
    font-size:2.5rem;
    margin-bottom:20px;
    ">
    Gracias ❤️
    </h1>
    <p style="
    color:white;
    font-size:1.2rem;
    max-width:500px;
    line-height:1.8;
    ">
    No sé qué nos depare el futuro.
    Pero sí sé que quiero seguir
    descubriendo quién eres.
    Sin apuros.
    Sin expectativas imposibles.
    Simplemente disfrutando cada
    momento contigo.
    Gracias por aparecer en mi vida.
    🌸
    </p>
    <button id="closeEnding"
    style="
    margin-top:35px;
    padding:15px 35px;
    border:none;
    border-radius:50px;
    background:#ff6b9b;
    color:white;
    font-size:18px;
    cursor:pointer;
    ">
    Continuemos esta historia ❤️
    </button>
    `;
    document.body.appendChild(overlay);
    document
    .getElementById("closeEnding")
    .addEventListener("click",()=>{
        overlay.remove();
    });
}

//========================================
// BRILLO BOTÓN
//========================================

setInterval(()=>{
    heartButton.animate([
        {
            boxShadow:"0 0 10px pink"
        },
        {
            boxShadow:"0 0 35px #ff7fb8"
        },
        {
            boxShadow:"0 0 10px pink"
        }
    ],{
        duration:1800
    });
},1800);

//========================================
// FLOTAR TARJETAS
//========================================

document.querySelectorAll(".card").forEach(card=>{
    card.addEventListener("mouseenter",()=>{
        card.style.transform="translateY(-8px) scale(1.01)";
    });
    card.addEventListener("mouseleave",()=>{
        card.style.transform="translateY(0px)";
    });
});

//========================================
// DESTELLOS
//========================================

setInterval(()=>{
    const sparkle=document.createElement("div");
    sparkle.innerHTML="✨";
    sparkle.style.position="fixed";
    sparkle.style.left=Math.random()*window.innerWidth+"px";
    sparkle.style.top=Math.random()*window.innerHeight+"px";
    sparkle.style.pointerEvents="none";
    sparkle.style.opacity="1";
    sparkle.style.fontSize=(10+Math.random()*18)+"px";
    sparkle.style.zIndex="500";
    document.body.appendChild(sparkle);
    sparkle.animate([
        {
            opacity:1,
            transform:"scale(.4)"
        },
        {
            opacity:1,
            transform:"scale(1.3)"
        },
        {
            opacity:0,
            transform:"scale(.2)"
        }
    ],{
        duration:1600
    });
    setTimeout(()=>{
        sparkle.remove();
    },1600);
},500);

//========================================
// FRASES ALEATORIAS
//========================================

const frases=[
"Me encanta tu sonrisa 🌸",
"Eres increíble ❤️",
"Nunca dejes de sonreír ✨",
"Gracias por existir ☕",
"Espero seguir conociéndote 🐈"
];

setInterval(()=>{
    const frase=document.createElement("div");
    frase.innerHTML=frases[Math.floor(Math.random()*frases.length)];
    frase.style.position="fixed";
    frase.style.bottom="20px";
    frase.style.left="50%";
    frase.style.transform="translateX(-50%)";
    frase.style.background="rgba(255,255,255,.1)";
    frase.style.padding="10px 20px";
    frase.style.borderRadius="30px";
    frase.style.backdropFilter="blur(8px)";
    frase.style.color="white";
    frase.style.opacity="0";
    frase.style.zIndex="9000";
    document.body.appendChild(frase);
    frase.animate([
        {opacity:0},
        {opacity:1},
        {opacity:1},
        {opacity:0}
    ],{
        duration:4500
    });
    setTimeout(()=>{
        frase.remove();
    },4500);
},12000);


document.addEventListener("DOMContentLoaded", () => {

    const startBtn = document.getElementById("startBtn");
    const content = document.getElementById("content");

    startBtn.addEventListener("click", () => {

        content.classList.remove("hidden");
        content.classList.add("show");

        startBtn.style.display = "none";

        content.scrollIntoView({
            behavior: "smooth"
        });

    });

});