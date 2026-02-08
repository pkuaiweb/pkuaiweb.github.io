import{_ as h,c as a,b as t,d as s,w as o,u as r,R as l,t as c,F as v,r as y,i as p,j as w,f as d,g as m}from"./index-BHRLuEv6.js";const S=[{id:"intelligent-system-software",title:"Intelligent System Software",shortDesc:"Developing smart software systems that adapt and learn",description:"Our research in intelligent system software focuses on creating adaptive and intelligent software systems that can learn from their environment and optimize their behavior automatically.",content:`# Intelligent System Software

## Overview

Intelligent system software represents the next generation of software systems that can adapt, learn, and optimize themselves based on runtime behavior and environmental conditions.

## Research Focus

### Adaptive Systems
- **Self-optimizing software**: Systems that automatically tune their parameters for optimal performance
- **Context-aware applications**: Software that adapts to user context and environment
- **Intelligent resource management**: Dynamic allocation and optimization of computational resources

### Machine Learning Integration
- **ML-powered software components**: Embedding machine learning capabilities into traditional software
- **Automated bug detection**: Using AI to identify and predict software defects
- **Performance prediction**: ML models for predicting system behavior under different conditions

### Intelligent Debugging and Testing
- **Automated test generation**: AI-driven test case generation
- **Smart debugging tools**: Intelligent tools for fault localization and diagnosis
- **Predictive maintenance**: Proactive identification of potential system failures

## Key Technologies

- Deep Learning
- Reinforcement Learning
- Program Analysis
- Runtime Monitoring
- Automated Reasoning

## Applications

- Cloud computing platforms
- Distributed systems
- Mobile applications
- IoT systems

## Recent Publications

Our team has published numerous papers on intelligent system software in top-tier conferences including FSE, ICSE, and ASE.

## Collaborations

We collaborate with leading tech companies and research institutions worldwide to advance the state-of-the-art in intelligent software systems.`,img:"/img/placeholder.png",tags:["AI","Software Engineering","Machine Learning"]},{id:"web-system-design-optimization",title:"Web System Design & Optimization",shortDesc:"Creating efficient and scalable web architectures",description:"We research cutting-edge techniques for designing, optimizing, and scaling modern web systems to handle massive traffic and complex workloads.",content:`# Web System Design & Optimization

## Overview

Web systems are the backbone of modern internet services. Our research focuses on designing efficient, scalable, and reliable web architectures that can serve billions of users worldwide.

## Research Focus

### Performance Optimization
- **Frontend optimization**: Techniques to reduce page load time and improve user experience
- **Backend optimization**: Database query optimization, caching strategies, and API design
- **Network optimization**: CDN strategies, protocol optimization, and latency reduction

### Scalability
- **Horizontal scaling**: Designing systems that can scale out to handle increasing traffic
- **Load balancing**: Intelligent traffic distribution across multiple servers
- **Microservices architecture**: Breaking down monolithic applications into scalable services

### Reliability and Availability
- **Fault tolerance**: Building systems that continue operating despite failures
- **Disaster recovery**: Strategies for quick recovery from system failures
- **Monitoring and alerting**: Real-time system health monitoring

## Key Technologies

- Cloud Computing (AWS, Azure, GCP)
- Container Orchestration (Kubernetes)
- Message Queues (Kafka, RabbitMQ)
- Distributed Databases (MongoDB, Cassandra)
- Caching Systems (Redis, Memcached)

## Research Areas

### Web Performance
- Page load optimization
- Resource prioritization
- Progressive web applications
- HTTP/3 and QUIC protocols

### Server-Side Optimization
- Database indexing strategies
- Query optimization
- Server-side rendering vs. client-side rendering
- API design patterns

### Infrastructure
- Serverless architectures
- Edge computing
- Content delivery networks
- Auto-scaling strategies

## Applications

- E-commerce platforms
- Social media services
- Video streaming services
- Real-time collaboration tools

## Industry Impact

Our research has been adopted by major tech companies to improve their web services, resulting in significant performance improvements and cost savings.`,img:"/img/placeholder.png",tags:["Web","Performance","Scalability"]},{id:"mobile-computing-systems",title:"Mobile Computing Systems",shortDesc:"Building next-generation mobile applications and platforms",description:"Our mobile computing research explores innovative approaches to building efficient, user-friendly, and intelligent mobile applications and systems.",content:`# Mobile Computing Systems

## Overview

Mobile devices have become the primary computing platform for billions of users worldwide. Our research focuses on advancing mobile computing systems to be more efficient, intelligent, and user-friendly.

## Research Focus

### Mobile App Development
- **Cross-platform development**: Building apps that work seamlessly across iOS, Android, and other platforms
- **Progressive web apps**: Bridging the gap between web and native apps
- **Low-code/no-code platforms**: Democratizing app development

### Performance and Energy Efficiency
- **Battery optimization**: Techniques to extend mobile device battery life
- **Resource management**: Efficient CPU, memory, and network usage
- **App startup optimization**: Reducing app launch time

### Mobile AI
- **On-device machine learning**: Running ML models directly on mobile devices
- **Federated learning**: Privacy-preserving distributed ML on mobile devices
- **Computer vision applications**: Real-time image and video processing on mobile

## Key Technologies

- Android Development (Kotlin, Jetpack)
- iOS Development (Swift, SwiftUI)
- Cross-platform Frameworks (React Native, Flutter)
- Mobile ML (TensorFlow Lite, Core ML)
- Edge Computing

## Research Areas

### Mobile User Experience
- Gesture recognition and interaction design
- Accessibility features for diverse users
- Context-aware mobile applications
- Augmented reality (AR) applications

### Mobile System Optimization
- App launch time optimization
- Memory management strategies
- Network request optimization
- Background task scheduling

### Security and Privacy
- Secure data storage on mobile devices
- Privacy-preserving analytics
- Biometric authentication
- Mobile malware detection

## Applications

- Mobile payment systems
- Health and fitness tracking apps
- Augmented reality applications
- Mobile gaming platforms
- Location-based services

## Industry Partnerships

We work closely with mobile platform providers and app developers to ensure our research has real-world impact and addresses practical challenges in mobile computing.

## Future Directions

We are exploring emerging areas such as:
- 5G-enabled mobile applications
- Edge computing for mobile devices
- Wearable computing integration
- Mobile-first AI applications`,img:"/img/placeholder.png",tags:["Mobile","AI","UX"]}],A={key:0,class:"page"},M={class:"breadcrumb"},k={class:"project-article"},z={class:"title"},D={class:"meta"},P={class:"tags"},I={class:"description"},C=["innerHTML"],R={class:"back-link"},_={key:1,class:"page"},x={__name:"ProjectDetail",setup(L){const u=w(),f=p(()=>u.params.id),i=p(()=>S.find(n=>n.id===f.value)),b=p(()=>{if(!i.value?.content)return"";let n=i.value.content;return n=n.replace(/^### (.*$)/gim,"<h3>$1</h3>"),n=n.replace(/^## (.*$)/gim,"<h2>$1</h2>"),n=n.replace(/^# (.*$)/gim,"<h1>$1</h1>"),n=n.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>"),n=n.replace(/^\- (.*$)/gim,"<li>$1</li>"),n=n.replace(/(<li>.*<\/li>)/s,"<ul>$1</ul>"),n=n.split(`

`).map(e=>e.startsWith("<h")||e.startsWith("<ul")||e.startsWith("<li")?e:e.trim()===""?"":`<p>${e}</p>`).join(`
`),n});return(n,e)=>i.value?(d(),a("div",A,[t("div",M,[s(r(l),{to:"/"},{default:o(()=>[...e[0]||(e[0]=[m("Home",-1)])]),_:1}),e[2]||(e[2]=t("span",{class:"separator"},"/",-1)),s(r(l),{to:"/projects"},{default:o(()=>[...e[1]||(e[1]=[m("Projects",-1)])]),_:1}),e[3]||(e[3]=t("span",{class:"separator"},"/",-1)),t("span",null,c(i.value.title),1)]),t("article",k,[t("h1",z,c(i.value.title),1),t("div",D,[t("div",P,[(d(!0),a(v,null,y(i.value.tags,g=>(d(),a("span",{key:g,class:"tag"},c(g),1))),128))])]),t("div",I,c(i.value.description),1),t("div",{class:"content",innerHTML:b.value},null,8,C),t("div",R,[s(r(l),{to:"/projects"},{default:o(()=>[...e[4]||(e[4]=[m("← Back to Projects",-1)])]),_:1})])])])):(d(),a("div",_,[e[6]||(e[6]=t("h1",null,"Project Not Found",-1)),e[7]||(e[7]=t("p",null,"The project you're looking for doesn't exist.",-1)),s(r(l),{to:"/projects"},{default:o(()=>[...e[5]||(e[5]=[m("← Back to Projects",-1)])]),_:1})]))}},j=h(x,[["__scopeId","data-v-02432d3e"]]);export{j as default};
