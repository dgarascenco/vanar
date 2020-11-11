class Search {

    constructor(type = ' nickname', searchArray){       
        this.type = type 
        this.searchArray = searchArray
    }

    render (root){
        ///////      главный блок поиска
        let div = document.createElement('div')
            div.classList.add("search")

        ////////////////поиск по имени пользователя
        let input = document.createElement('input')
            input.placeholder = "Search for" + this.type

        div.appendChild(input)
        root.appendChild(div)

        ///////////// блок фильтра по полу
        let div_gender = document.createElement('div')
            div_gender.className = "gender"
            div.appendChild(div_gender)
        this.addGender('all', true)
        this.addGender('Male')
        this.addGender('Female')
        this.addGender('Undecided')

        ///////////// блок фильтра по возрасту
        let div_age = document.createElement('div')
            div_age.className = "age"
            div.appendChild(div_age)
        let ageFrom = document.createElement('select')
        let ageTo = document.createElement('select')
        ageFrom.setAttribute("id", "yearFrom")
        ageTo.setAttribute("id", "yearTo")

        for (let year = 1970; year <= 2020; year++) {
            let optionFrom = document.createElement("OPTION")
            let optionTo = document.createElement("OPTION")
            ageFrom.appendChild(optionFrom).innerHTML = year
            ageTo.appendChild(optionTo).innerHTML = year
        }
        ageFrom[0].selected = true
        ageTo[50].selected = true
        div_age.appendChild(ageFrom)
        div_age.appendChild(ageTo)

        /////////// блок онлайн
        let div_online = document.createElement('div')
            div_online.className = "online"
        let input_online = document.createElement('input')
            input_online.setAttribute("type", "checkbox")
            input_online.id = "online"
            input_online.value = "true"
        let label = document.createElement("label")
            label.htmlFor = "online"
            label.innerText = "On Line Only "

            div_online.appendChild(input_online)
            div_online.appendChild(label)
            div.appendChild(div_online)

        ////////////блок вывода результата    
        let divResult = document.createElement('div')
            divResult.classList.add("result")
            div.appendChild(divResult)

        let searchArray = this.searchArray
 
        input.addEventListener("keyup", eventSearch)
        div.addEventListener("click", eventSearch)       
        
        function eventSearch (e) {
            let div = document.querySelector('.result')
                div.textContent = ""
            let gender = document.querySelector( 'input[name="gender"]:checked');                               
            let online = document.querySelector('.online').firstChild
            let text = document.querySelector('.search').firstChild
            let yearFrom = document.getElementById('yearFrom')
            let yearTo = document.getElementById('yearTo')          

                searchArray.filter( value => value.nickname.toLowerCase().indexOf(text.value.toLowerCase()) != -1 )                     //   фильтр по имени 
                            .filter( value => gender.value.indexOf( value.gender ) != -1  )                                             //   фильтр по полу
                            .filter( value => value.dob.getFullYear() >= yearFrom.value && value.dob.getFullYear() <= yearTo.value )    //   фильтр по возрасту 
                            .filter( value => value.online == online.checked || value.online == true )                                  //   фильтр по статусу "в сети"
                            .filter( value => value.render( document.querySelector('.result'), "search" ) )                             //   отображение фильтра
                         }       
                    
       
    }
    /////////// Добавление очередного пола
    addGender(title, check = false){       
        let div = document.querySelector(".gender")
        let radio = document.createElement("input")
            radio.setAttribute("type", "radio")
            radio.id = "gender_" + title
            if (title == "all") radio.value = "all*Male*Female*Undecided"   /// некорректно получилось
            else radio.value = title
            radio.name = "gender"
            radio.checked = check
        let label = document.createElement("label")
            label.htmlFor = "gender_" + title
            label.innerText = title
            div.appendChild(radio)
            div.appendChild(label)
    }
}