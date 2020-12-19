(()=>{

    let yOffset;
    let currentScene;
    let prevScrollHeight;
    let enterScene;

    const sceneInfo = [
        {//0
            //첫번째는 스크롤의 높이 (모바일, 컴퓨터 화면이 다 다르기에 따로 설정해줘야한다.)
            type: 'sticky',
            heightNum:5, 
            scrollHeight: 0,
            objs:{
                container:document.querySelector('#scroll-section-0'),
                messageA:document.querySelector('#scroll-section-0 .main-message.a'),
                messageB:document.querySelector('#scroll-section-0 .main-message.b'),
                messageC:document.querySelector('#scroll-section-0 .main-message.c'),
                messageD:document.querySelector('#scroll-section-0 .main-message.d'),
            },
            value:{
                messageA_opacity_in:[0,1,{start:0.1,end:0.2}],
                messageA_opacity_out:[1,0,{start:0.25,end:0.3}],
                messageB_opacity_in:[0,1,{start:0.3,end:0.4}],
                messageB_opacity_out:[1,0,{start:0.45,end:0.5}],
                messageC_opacity_in:[0,1,{start:0.5,end:0.6}],
                messageC_opacity_out:[1,0,{start:0.65,end:0.7}],
                messageD_opacity_in:[0,1,{start:0.7,end:0.8}],
                messageD_opacity_out:[1,0,{start:0.85,end:0.9}],
                messageA_translate_in:[20,0,{start:0.1, end:0.2}],
                messageB_translate_in:[20,0,{start:0.3, end:0.4}],
                messageC_translate_in:[20,0,{start:0.5, end:0.6}],
                messageD_translate_in:[20,0,{start:0.7, end:0.8}],
                messageA_translate_out:[0,-20,{start:0.25, end:0.3}],
                messageB_translate_out:[0,-20,{start:0.45, end:0.5}],
                messageC_translate_out:[0,-20,{start:0.65, end:0.7}],
                messageD_translate_out:[0,-20,{start:0.85, end:0.9}],
            }
        },
        {//1
            type : 'normal',
            heightNum:5, 
            scrollHeight: 0,
            objs:{
                container:document.querySelector('#scroll-section-1')
           

            }
        },
        {//2
            //첫번째는 스크롤의 높이 (모바일, 컴퓨터 화면이 다 다르기에 따로 설정해줘야한다.)
            type: 'sticky',
            heightNum:5, 
            scrollHeight: 0,
            objs:{
                container:document.querySelector('#scroll-section-2'),
                messageA:document.querySelector('#scroll-section-2 .desc-message.a'),
                messageB:document.querySelector('#scroll-section-2 .desc-message.b'),
                messageC:document.querySelector('#scroll-section-2 .desc-message.c'),
            }
        }
    ];

    function setlayout(){
        
        for(let i=0; i < sceneInfo.length; i++){
            if(sceneInfo[i].type === 'sticky'){
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            }else if(sceneInfo[i].type === 'normal'){
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }

            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        yOffset = window.pageYOffset;
        let totalScrollHeight=0;
        for(let i=0; i< sceneInfo.length; i++){
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if(totalScrollHeight >= yOffset){
                currentScene = i;
                break;
            }

        }

        document.body.setAttribute('id',`show-scene-${currentScene}`);
       
    }

    function scrollAnimation(){
        const currentyOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const offsetRatio = currentyOffset/scrollHeight;
        const value = sceneInfo[currentScene].value;
        switch (currentScene) {
            case 0:
                if(offsetRatio < 0.22){
                    sceneInfo[0].objs.messageA.style.opacity = caculValue(currentyOffset,value.messageA_opacity_in,scrollHeight);
                    sceneInfo[0].objs.messageA.style.transform = `translateY(${caculValue(currentyOffset,value.messageA_translate_in,scrollHeight)}%)`;
                }else{
                    sceneInfo[0].objs.messageA.style.opacity = caculValue(currentyOffset,value.messageA_opacity_out,scrollHeight);  
                    sceneInfo[0].objs.messageA.style.transform = `translateY(${caculValue(currentyOffset,value.messageA_translate_out,scrollHeight)}%)`;
                }
                if(offsetRatio < 0.42){
                    sceneInfo[0].objs.messageB.style.opacity = caculValue(currentyOffset,value.messageB_opacity_in,scrollHeight); 
                    sceneInfo[0].objs.messageB.style.transform = `translateY(${caculValue(currentyOffset,value.messageB_translate_in,scrollHeight)}%)`; 
                }else{
                    sceneInfo[0].objs.messageB.style.opacity = caculValue(currentyOffset,value.messageB_opacity_out,scrollHeight);  
                    sceneInfo[0].objs.messageB.style.transform = `translateY(${caculValue(currentyOffset,value.messageB_translate_out,scrollHeight)}%)`;
                }
                if(offsetRatio < 0.62){
                    sceneInfo[0].objs.messageC.style.opacity = caculValue(currentyOffset,value.messageC_opacity_in,scrollHeight); 
                    sceneInfo[0].objs.messageC.style.transform = `translateY(${caculValue(currentyOffset,value.messageC_translate_in,scrollHeight)}%)`; 
                }else{
                    sceneInfo[0].objs.messageC.style.opacity = caculValue(currentyOffset,value.messageC_opacity_out,scrollHeight); 
                    sceneInfo[0].objs.messageC.style.transform = `translateY(${caculValue(currentyOffset,value.messageC_translate_out,scrollHeight)}%)`; 
                }
                if(offsetRatio < 0.82){
                    sceneInfo[0].objs.messageD.style.opacity = caculValue(currentyOffset,value.messageD_opacity_in,scrollHeight);  
                    sceneInfo[0].objs.messageD.style.transform = `translateY(${caculValue(currentyOffset,value.messageD_translate_in,scrollHeight)}%)`;
                }else{
                    sceneInfo[0].objs.messageD.style.opacity = caculValue(currentyOffset,value.messageD_opacity_out,scrollHeight);  
                    sceneInfo[0].objs.messageD.style.transform = `translateY(${caculValue(currentyOffset,value.messageD_translate_out,scrollHeight)}%)`;
                }
                      
            break;
            case 1:
                
            break;
            case 2:
                
            break;

        
            default:
                break;
        }
    }

    function caculValue(currentyOffset,value,scrollHeight){
        let start = value[2].start;
        let end = value[2].end;
        let localStart = scrollHeight * start;
        let localEnd = scrollHeight * end;
        let localYoffset = currentyOffset - localStart;
        let localPart = localEnd - localStart;
        let Real;
        
        if(currentyOffset >= localStart && currentyOffset <= localEnd && value[0]===0){
            Real = (localYoffset / localPart)*value[1];
        }else if(currentyOffset > localEnd){
            Real = value[1]
        }else if(currentyOffset < localStart){
            Real = value[0]
        }else{
            Real = (1-(localYoffset / localPart))*value[0];
        }
        console.log(Real);
        return Real;

    }


    function Loop(){
        enterScene = false;
        prevScrollHeight = 0;
        for(let i =0; i<currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if(yOffset >= sceneInfo[currentScene].scrollHeight+prevScrollHeight){
            currentScene++;
            document.body.setAttribute('id',`show-scene-${currentScene}`);

        }else if(yOffset < prevScrollHeight){
            if(currentScene===0)return;
            enterScene = true;
            currentScene--;
            document.body.setAttribute('id',`show-scene-${currentScene}`);
        }
        if(enterScene)return;

        scrollAnimation();
    }


    window.addEventListener('scroll',()=>{
        yOffset = parseInt(pageYOffset);
        Loop();
    });

    window.addEventListener('load',setlayout);
    window.addEventListener('resize',setlayout);

})();
