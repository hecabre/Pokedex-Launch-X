var musicHandler = true;
const buttonPlay = document.getElementById("sound");

const fetchPokemon = () => {
  const pokeNameInput = document.getElementById("pokeName");
  let pokeName = pokeNameInput.value;
  pokeName = pokeName.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
  fetch(url)
    .then((res) => {
      if (res.status != "200") {
        console.log(res);
        pokeImage("./static/sad.jpg");
        pokemonName("Pokemon no encontrado :(");
        pokeType("No se ha encontrado el pokemon");
        pokeHability("No se ha encontrado el pokemon");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        console.log(data);
        let pokeImg = data.sprites.front_default;
        let pokeName = data.name;
        let typePoke = data.types[0].type.name;
        let pokeInfo = data.abilities;
        pokeImage(pokeImg);
        setSprites(pokeImg,data.sprites);
        pokemonName(pokeName);
        pokeType(typePoke);
        pokeHability(pokeInfo);
        setHeight(data.height);
        pokeWeight(data.weight);
        pokeId(data.id);
      }
    });
};

const setSprites= (m,spri) => {
  let imgClass = [];
  let backdef=spri.back_default;
  let backshi=spri.back_shiny;
  let frontdef=spri.front_default;
  let frontshi=spri.front_shiny;
  let homefrontdef=spri.other.home.front_default;
  let dreamfrontdef=spri.other.dream_world.front_default;
  const imgText = document.getElementById('imgText');
  const i1=document.getElementById("img1");
  const i2=document.getElementById("img2");
  const i3=document.getElementById("img3");
  const i4=document.getElementById("img4");
  const i5=document.getElementById("img5");
  const i6=document.getElementById("img6");
  imgClass.push(i1, i2, i3, i4, i5, i6);
  imgText.innerHTML = 'Imagenes:'
  i1.src=backdef;
  i2.src=backshi;
  i3.src=frontdef;
  i4.src=frontshi;
  i5.src=homefrontdef;
  i6.src=dreamfrontdef;
  imgClass.forEach(e => {
    setTimeout(() => {
      e.className = "animate__animated animate__fadeInUp";
    }, 100);
    e.className = "";
  })
}

const pokeId = (data) => {
   const getid = document.getElementById('id');
   getid.innerHTML = `#${data}`;
}
const pokeWeight = (weight) => {
  const weights = document.getElementById('weight');
  weights.innerHTML =  `El peso es: <h3 class="result">${weight} m</h3>`;
}
const setHeight = (alt) => {
  const pname = document.getElementById("height");
  pname.innerHTML= `La altura es: <h3 class="result">${alt} cm</h3>`;
}

const pokeType = (type) => {
  const types = document.getElementById("type");
  types.innerHTML = `El tipo de pokemon es: <h3 class="result">${type}</h3>`;
};

const pokemonName = (name) => {
  const idName = document.getElementById("name");
  idName.innerHTML = name.toUpperCase();
};

const pokeImage = (url) => {
  const pokePhoto = document.getElementById("pokeImg");
  setTimeout(() => {
    pokePhoto.className = "animate__animated animate__heartBeat";
  }, 100);
  pokePhoto.className = "";
  pokePhoto.src = url;
};

const pokeHability = (ability) => {
  const habilitys = document.getElementById("hability");
  try {
    const abilitiesNames = ability.map((item) => item.ability.name);
    habilitys.innerHTML = `Las habilidades que poseé: <h3 class="result">${abilitiesNames}</h3>`;
  } catch {
    const habilitys = document.getElementById("hability");
    habilitys.innerHTML = `Las habilidades que poseé: <h3 class="result">${ability}</h3>`;
  }
};

buttonPlay.addEventListener("click", function () {
  const audio = document.getElementById("audio");
  const buttonAudio = document.getElementById("sound");
  if (!musicHandler) {
    audio.currentTime = 0;
    audio.pause();
    buttonAudio.innerHTML = "Music Off🔇";
  } else {
    audio.play();
    buttonAudio.innerHTML = "Music On🎵";
  }
  musicHandler = !musicHandler;
});

document.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    fetchPokemon();
  }
});
