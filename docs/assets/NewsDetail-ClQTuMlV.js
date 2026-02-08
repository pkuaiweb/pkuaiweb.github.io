import{_ as h,c as u,b as n,d as a,w as o,u as i,R as l,t as d,i as r,j as g,f as b,g as c}from"./index-CBsOC5kJ.js";const w=[{id:"welcome-to-pku-ai-web-lab",date:"2026-02",title:"Welcome to PKU AI Web Lab",excerpt:"We are excited to announce the official launch of PKU AI Web Lab.",content:`# Welcome to PKU AI Web Lab

We are excited to announce the official launch of PKU AI Web Lab at the School of Artificial Intelligence, Peking University.

## Our Mission

Our lab focuses on advancing intelligent web systems and software engineering through cutting-edge research in:

- **Intelligent System Software**: Developing smart software systems that adapt and learn
- **Web System Design & Optimization**: Creating efficient and scalable web architectures
- **Mobile Computing Systems**: Building next-generation mobile applications and platforms

## Join Us

We welcome talented students and researchers who are passionate about web technologies and artificial intelligence to join our team.

For more information, please contact Prof. Yun Ma at mayun@pku.edu.cn`},{id:"lab-website-launched",date:"2026-01",title:"Lab website officially launched",excerpt:"Our new lab website is now live, showcasing our research and team.",content:`# Lab Website Officially Launched

We are pleased to announce that our lab website has been officially launched!

## Features

The website includes:

- **Team**: Meet our faculty and students
- **Projects**: Explore our ongoing research projects
- **Publications**: Browse our latest papers and publications
- **Awards**: View our achievements and recognitions

## Technology Stack

Our website is built using modern web technologies:
- Vue.js 3
- Vite
- Vue Router

Visit our website regularly for updates on our latest research and news.

Stay connected with PKU AI Web Lab!`}],_={key:0,class:"page"},v={class:"breadcrumb"},y={class:"news-article"},W={class:"meta"},k={class:"date"},x={class:"title"},L=["innerHTML"],$={class:"back-link"},I={key:1,class:"page"},P={__name:"NewsDetail",setup(N){const p=g(),m=r(()=>p.params.id),s=r(()=>w.find(t=>t.id===m.value)),f=r(()=>{if(!s.value?.content)return"";let t=s.value.content;return t=t.replace(/^### (.*$)/gim,"<h3>$1</h3>"),t=t.replace(/^## (.*$)/gim,"<h2>$1</h2>"),t=t.replace(/^# (.*$)/gim,"<h1>$1</h1>"),t=t.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>"),t=t.replace(/^\- (.*$)/gim,"<li>$1</li>"),t=t.replace(/(<li>.*<\/li>)/s,"<ul>$1</ul>"),t=t.split(`

`).map(e=>e.startsWith("<h")||e.startsWith("<ul")||e.startsWith("<li")?e:e.trim()===""?"":`<p>${e}</p>`).join(`
`),t});return(t,e)=>s.value?(b(),u("div",_,[n("div",v,[a(i(l),{to:"/"},{default:o(()=>[...e[0]||(e[0]=[c("Home",-1)])]),_:1}),e[1]||(e[1]=n("span",{class:"separator"},"/",-1)),e[2]||(e[2]=n("span",null,"News",-1))]),n("article",y,[n("div",W,[n("span",k,d(s.value.date),1)]),n("h1",x,d(s.value.title),1),n("div",{class:"content",innerHTML:f.value},null,8,L),n("div",$,[a(i(l),{to:"/"},{default:o(()=>[...e[3]||(e[3]=[c("← Back to Home",-1)])]),_:1})])])])):(b(),u("div",I,[e[5]||(e[5]=n("h1",null,"News Not Found",-1)),e[6]||(e[6]=n("p",null,"The news article you're looking for doesn't exist.",-1)),a(i(l),{to:"/"},{default:o(()=>[...e[4]||(e[4]=[c("← Back to Home",-1)])]),_:1})]))}},V=h(P,[["__scopeId","data-v-eae4fd9a"]]);export{V as default};
