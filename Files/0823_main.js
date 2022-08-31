(()=>{

    let yOffset = 0;
    let currentSection = 0;

    const sectionSet = [
        {
            height: 0,            
            hMultiple: 5,

            objs : {
                container : document.querySelector('#section-0'),


            },
        },
        {

            height: 0,
            hMultiple: 5,
            objs : {
                container : document.querySelector('#section-1'),


            },

        }
    ];


    // section의 크기, 위치등의 레이아웃을 설정한다.
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



    ///////////////////////////////////////////////////////////////////////////////
    // Event Handler

    // 스크롤 이벤트
    window.addEventListener('scroll', ()=>{
        yOffset = window.scrollY;
        currentSection = getCurrentSection();

        setBodyID(currentSection);
        
        setLocalnavMenu(yOffset);

    });

    // 처음 로딩시 (리소스가 모두 로딩될 때)
    window.addEventListener('load', ()=>{        
        setLayout();
        currentSection = getCurrentSection();
        setBodyID(currentSection);
        setLocalnavMenu(yOffset);

    });

    // 윈도우의 크기가 바뀔 때
    window.addEventListener('resize', ()=>{       
        setLayout();        
        currentSection = getCurrentSection();
        setBodyID(currentSection);
        setLocalnavMenu(yOffset);

    });




})();