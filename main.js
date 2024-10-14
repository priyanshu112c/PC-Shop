const tlLeave = gsap.timeline({
    default: { duration: 0.75, ease: "Power2.easeOut" }
});
const tlEnter = gsap.timeline({
    default: { duration: 0.75, ease: "Power2.easeOut" }
});

const leaveAnimtion = (current, done) => {
    const product = current.querySelector('.image-container');
    const text = current.querySelector('.showcase-text');
    const circle = current.querySelectorAll('.circle');
    const arrow = current.querySelector('.showcase-arrow')
    return (
        tlLeave.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 50 }),
        tlLeave.fromTo(product, { y: 100, opacity: 1 }, { y: -100, opacity: 0, onComplete: done },
            "<"
        ),
        tlLeave.fromTo(text,{y:0,opacity:1},{opacity:0,y:100},"<"),
        tlLeave.fromTo(circle,{y:0,opacity:1},{y:-200,opacity:0,stagger:0.15,ease:'back.out(1.7)',duration:1},"<")
    )
}

const enterAnimtion = (current, done, gradient) => {
    const product = current.querySelector('.image-container');
    const text = current.querySelector('.showcase-text');
    const circle = current.querySelectorAll('.circle');
    const arrow = current.querySelector('.showcase-arrow')
    return (
        tlEnter.fromTo(arrow, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }),
        tlEnter.to("body",{background:gradient},"<"),
        tlEnter.fromTo(product, { y: -100, opacity: 0 }, { y: 0, opacity: 1, onComplete: done },
            "<"
        ),
        tlEnter.fromTo(text,{y:100,opacity:0},{opacity:1,y:0},"<"),
        tlEnter.fromTo(circle,{y:-200,opacity:0},{y:0,opacity:1,stagger:0.15,ease:'back.out(1.7)',duration:1},"<")
    )
}
barba.init({
    preventRunning: true,
    transitions: [
        {
            debug: true,
            name: "default",
            once(data){
                const done = this.async();
                let next = data.next.container;
                let gradient = getGradient(data.next.namespace);
                gsap.set('body',{background:gradient});
                enterAnimtion(next,done,gradient)
            },
            leave(data) {
                    const done = this.async();
                    let current = data.current.container;
                    leaveAnimtion(current, done)
            },
            enter(data) {
                    const done = this.async();
                    let next = data.next.container;
                    let gradient = getGradient(data.next.namespace)
                    enterAnimtion(next,done,gradient)
            }
        },
        //product transition animation
        {
            name:'product-tranisition-animation',
            sync:true,
            from:{namespace:['handbag','product']},
            to:{namespace:['product','handbag']},
            enter(data){
                const done = this.async();
                let next = data.next.container;
                productEnterAnimation(next,done);
            },
            leave(data){
                const done = this.async();
                let current = data.current.container;
                productLeaveAnimation(current,done)
            }
        }
    ]
})

function productEnterAnimation(next,done){
    tlEnter.fromTo(next,{y:'100%'},{y:'0%'})
    tlEnter.fromTo('.card',{opacity:0,y:50},{opacity:1,y:0,stagger:0.25,onComplete:done})
}
function productLeaveAnimation(current,done){
    tlLeave.fromTo(current,{y:'0%'},{y:'100%', onComplete:done})
    
}
//changing gradient 
function getGradient(name){
    switch (name) {
        case "handbag":
            return "linear-gradient(260deg, #b75d62,#754d4f)";
        case "boot":
            return "linear-gradient(260deg, #5d8cb7,#4c4f70)";
        case "hat":
            return "linear-gradient(260deg, #067041,#5b7947)"
        default:
            break;
    }
}