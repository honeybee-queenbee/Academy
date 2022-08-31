(()=>{

    let yOffset = 0;            // 전체 문서에서의 yOffset
    let sectionYOffset = 0;     // 섹션내에서의 yOffset
    let currentSection = 0;     // 현재 섹션 번호

    const sectionSet = [
        {
            height: 0,
            hMultiple: 2,
            objs : {
                container : document.querySelector('#section-0'),
            },
            vals : {
            }            
        },

        {
            height: 0,            
            hMultiple: 5,

            objs : {
                container : document.querySelector('#section-1'),
                messageA : document.querySelector('.section1-message.a'),
                messageB : document.querySelector('.section1-message.b'),
                messageC : document.querySelector('.section1-message.c'),
                messageD : document.querySelector('.section1-message.d')
            },
            vals : {     
                messageA_opacity_in     : [0, 1, {start: 0.09, end: 0.19}],
                messageA_opacity_out    : [1, 0, {start: 0.21, end: 0.29}],
                messageA_translateY_in  : [0, -15, {start: 0.09, end: 0.19}],
                messageA_translateY_out : [-15, -30, {start: 0.21, end: 0.29}],
            
                messageB_opacity_in     : [0, 1, {start: 0.31, end: 0.39}],
                messageB_opacity_out    : [1, 0, {start: 0.41, end: 0.49}],
                messageB_translateY_in  : [0, -15, {start: 0.31, end: 0.39}],
                messageB_translateY_out : [-15, -30, {start: 0.41, end: 0.49}],
           
                messageC_opacity_in     : [0, 1, {start: 0.51, end: 0.59}],
                messageC_opacity_out    : [1, 0, {start: 0.61, end: 0.69}],
                messageC_translateY_in  : [0, -15, {start: 0.51, end: 0.59}],
                messageC_translateY_out : [-15, -30, {start: 0.61, end: 0.69}],

                messageD_opacity_in     : [0, 1, {start: 0.71, end: 0.79}],
                messageD_opacity_out    : [1, 0, {start: 0.81, end: 0.85}],
                messageD_translateY_in  : [0, -15, {start: 0.71, end: 0.79}],
                messageD_translateY_out : [-15, -30, {start: 0.81, end: 0.85}],           
            }


        },
        {
            height: 0,
            hMultiple: 2,
            objs : {
                container : document.querySelector('#section-2'),
            },
            vals : {
            }

        }
    ];


    const setLayout = function()
    {
        // section의 높이를 설정한다.
        for (let i = 0; i < sectionSet.length; i++)
        {
            sectionSet[i].height = window.innerHeight * sectionSet[i].hMultiple;
            sectionSet[i].objs.container.style.height = `${sectionSet[i].height}px`;
        }

    }

    // 현재 섹션을 알아내는 함수.
    const getCurrentSection = function()
    {
        let section = 0;

        if (yOffset <= sectionSet[0].height)
        {
            section = 0;

        }
        else if ((yOffset > sectionSet[0].height) && 
                 (yOffset <= sectionSet[0].height + sectionSet[1].height))        
        {
            section = 1;
        }
        else if ((yOffset > sectionSet[1].height) && 
                 (yOffset <= sectionSet[1].height + sectionSet[2].height))        
        {
        section = 2;
        }
        else
        {

        }

        return section;

    }


    // body태그에 아이디를 넣어주는 함수
    const setBodyID = function(section)
    {
        document.body.setAttribute('id', `show-section${section}`);
        
    }

    const setLocalnavMenu = function(offset)
    {
        if (offset > 44)
        {
            document.body.classList.add('local-nav-sticky');
          
        }
        else
        {
            document.body.classList.remove('local-nav-sticky');

        }

    }

    const getPrevSectionHeight = function()
    {
        let prevHeight = 0;

        for (let i = 0; i < currentSection; i++)
        {
            prevHeight = prevHeight + sectionSet[i].height;

        }

        return prevHeight;
    }


    const calcValue = function(values)
    {
        let result;

        const height = sectionSet[currentSection].height;
        let rate;

        let partStart;  
        let partEnd;     
        let partHeight;    
        if (values.length == 2)
        {
            rate = sectionYOffset / height;
            result = (rate * (values[1] - values[0])) + values[0];

        }

        else if (values.length === 3) 
        {
            partStart = values[2].start * height;
            partEnd   = values[2].end * height;
            partHeight = partEnd - partStart;

            if (sectionYOffset < partStart)
            {
                result = values[0];

            }
            else if (sectionYOffset > partEnd)
            {
                result = values[1];

            }
            else
            {
                rate = (sectionYOffset - partStart) / partHeight;
                result = (rate * (values[1] - values[0])) + values[0]
               
            }
           
        }

        return result;

    }



    const playAnimation = function()
    {
        const values  = sectionSet[currentSection].vals;
        const objects = sectionSet[currentSection].objs;
        const scrollRate = sectionYOffset / sectionSet[currentSection].height;
        let transY = 0;
        let imageIndex = 0;

        switch(currentSection)
        {
            case 0 :
                break;

            case 1 :

                objects.messageA.style.opacity = 0;
                objects.messageB.style.opacity = 0;
                objects.messageC.style.opacity = 0;
                objects.messageD.style.opacity = 0;
                
                break;

            case 2 :                         
                break;


        }

    }

    const scrollProc = function()
    {
        playAnimation();

    }


    window.addEventListener('scroll', ()=>{

        yOffset = window.scrollY;
        currentSection = getCurrentSection();
        sectionYOffset = yOffset - getPrevSectionHeight();

        setBodyID(currentSection);        
        setLocalnavMenu(yOffset);

        scrollProc();   

    });


})();