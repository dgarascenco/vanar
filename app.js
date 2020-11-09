////////Капитализация заданного текста
    function capitalize(text){
        return text[0].toUpperCase() + text.substring(1)
    }

///////текст сообщения об ошибке, тип компонента
    var errorMsg = {
        msg: "",
        type: ""
    }

//////////Загрузка  указанного компонента
    function loadComponent(name){

        let link = document.createElement('link')
            link.rel = "stylesheet"
            link.href = `src/${name}/${name}.css`
            errorMsg.type = name
            link.addEventListener( 'error',  errorAlert ) // добавлено
            //link.addEventListener( 'error', function() { alert(  `\nERROR!\n Cannot load ${name}.css component`) } )
        document.head.appendChild(link)  

        let script = document.createElement('script')
            script.src = `src/${name}/${capitalize(name)}.js`
            errorMsg.type = name
            script.addEventListener( 'error',  errorAlert ) // добавлено
            //script.addEventListener( 'error', function() { alert(  `\nERROR!\n Cannot load ${name}.js component`) } )         
        document.body.appendChild(script)    
    
    }

////////формирование сообщения добавлено
    function errorAlert(e){
        if (e.target.tagName.toLowerCase() == "link")   errorMsg.msg += `\n Cannot load ${errorMsg.type}.css component`;   
        else if (e.target.tagName.toLowerCase() == "script") errorMsg.msg += `\n Cannot load ${errorMsg.type}.js component`;   
    }

loadComponent("user")
loadComponent("search")

//////////Вывод потенциального сообщения об ошибке
    window.addEventListener("load", () => {   
        if (errorMsg.msg != "")    alert(errorMsg.msg)
    })

    window.onload = function(){
        console.log('WINDOW LOADED!!!')

        testFakeUser()
    }
