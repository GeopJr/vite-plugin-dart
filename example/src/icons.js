import "./style.scss";
import viteLogo from "@iconify/icons-logos/vitejs";
import dartLogo from "@iconify/icons-logos/dart";
import svelteLogo from "@iconify/icons-logos/svelte-icon";
import vueLogo from "@iconify/icons-logos/vue";
import crystalLogo from "@iconify/icons-logos/crystal";
import flutterLogo from "@iconify/icons-logos/flutter";
import nuxtLogo from "@iconify/icons-logos/nuxt-icon";
import kemalLogo from "@iconify/icons-logos/kemal";
import nodeLogo from "@iconify/icons-logos/nodejs-icon";
import phoenixLogo from "@iconify/icons-logos/phoenix";
import rubyLogo from "@iconify/icons-logos/ruby";
import sassLogo from "@iconify/icons-logos/sass";
import lessLogo from "@iconify/icons-logos/less";
import nativeScriptLogo from "@iconify/icons-logos/nativescript";
import archLogo from "@iconify/icons-logos/archlinux";
import kdeLogo from "@iconify/icons-logos/kde";
import copyleftLogo from "@iconify/icons-logos/copyleft";
import firefoxLogo from "@iconify/icons-logos/firefox";
import mozillaLogo from "@iconify/icons-logos/mozilla";
import apacheLogo from "@iconify/icons-logos/apache";

const icons = {
  vite: viteLogo,
  dart: dartLogo,
  svelte: svelteLogo,
  vue: vueLogo,
  crystal: crystalLogo,
  flutter: flutterLogo,
  nuxt: nuxtLogo,
  kemal: kemalLogo,
  node: nodeLogo,
  phoenix: phoenixLogo,
  ruby: rubyLogo,
  sass: sassLogo,
  less: lessLogo,
  nativescript: nativeScriptLogo,
  arch: archLogo,
  kde: kdeLogo,
  copyleft: copyleftLogo,
  firefox: firefoxLogo,
  mozilla: mozillaLogo,
  apache: apacheLogo,
};

const iconsParent = document.getElementById("icons");
Object.keys(icons).forEach((icon) => {
  const img = document.createElement("img");
  img.id = icon;
  img.src =
    "data:image/svg+xml;base64," +
    btoa(
      '<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">' +
        icons[icon].body +
        "</svg>"
    );
  iconsParent.appendChild(img);
});

console.log("[bonk!] Here's all the available text art logos!");
console.log(Object.keys(icons));
