class Search {

    constructor(model = []){       
        this.model = model
        this.result = model           
    }

    render (root){
        ///////      главный блок поиска
        let div = document.createElement('div')
            div.classList.add("search") 
        let resultDiv = document.createElement('div')
            resultDiv.className = "result"
        root.appendChild(div)
        root.appendChild(resultDiv) 
            
        let schema = this.model[0].getSchema()
        let schemaKeys = Object.keys(this.model[0].getSchema())

        schemaKeys.forEach ( value => this.addSearch(schema[value]))        

        this.root = root
    }
    ////////// добавление компонента поиска по схеме объекта
    addSearch(e){
        let div = document.querySelector('.search')
        ////////////////////компонент поиска <input type='text'>
        if (e.type == 'text'){
            let div_text = document.createElement("div")
                div_text.setAttribute("id", e.key)
            let input = document.createElement('input')
                input.setAttribute("type", "text")
                input.setAttribute("id", "search_" + e.key)
            let propertyName = Object.keys(this.model[0])[0]
                input.placeholder = "Searching for " + this.model[0].getType() + " " + propertyName
            div_text.appendChild(input)
            div.appendChild(div_text)
            input.addEventListener("keyup", this.onKey.bind(this))            
        }
        ////////////////////компонент поиска <input type='checkbox'>
        if (e.type == 'checkbox'){
            let div_checkbox = document.createElement("div")
                div_checkbox.setAttribute("id", e.key)
                div_checkbox.innerHTML = "<p><strong>" + e.key + ": </strong></p>"

            //////////  массив возможных значений
           let arrayCheckbox = this.uniqArray(this.createArray( this.model, e.key).sort())

            ////////////  создание checkbox-в
            for (let i=0; i<arrayCheckbox.length; i++){
                let checkbox = document.createElement('input')
                    checkbox.setAttribute("type", "checkbox")
                    checkbox.setAttribute("name", e.key)
                    checkbox.setAttribute("id",  e.key + "_" + arrayCheckbox[i])
                    checkbox.value = arrayCheckbox[i]
                let label = document.createElement("label")
                    label.htmlFor = e.key + "_" + arrayCheckbox[i]
                    label.innerText = arrayCheckbox[i]
                div_checkbox.appendChild(checkbox)
                div_checkbox.appendChild(label)
            }
            div.appendChild(div_checkbox)
            div.addEventListener("click", this.onKey.bind(this))
        }
        ////////////////////компонент поиска <select>
        if (e.type == 'select'){
            //////////  массив возможных значений
            let arraySelect = this.uniqArray(this.createArray( this.model, e.key).sort())

            let div_select = document.createElement("div")
                div_select.setAttribute("id", e.key)
                div_select.innerHTML = "<strong>" + e.key + ": </strong>"
            let select  = document.createElement("select")
                select.setAttribute("id", "search_" + e.key)
            let option = document.createElement("option")
                select.appendChild(option).innerHTML = "all"
            for (let i=0; i<arraySelect.length; i++){
                let option = document.createElement("option")
                    select.appendChild(option).innerHTML = arraySelect[i]
            }
            div_select.appendChild(select) 
            div.appendChild(div_select)           
        }
        ////////////////////компонент поиска range (select from && select to)
        if (e.type == 'range'){
            //////////  массив возможных значений
            let array = []
            for (let i=0; i<this.model.length; i++)
                array[i] = this.model[i][e.key].getFullYear()
            array.sort()
            let div_range = document.createElement("div")
                div_range.setAttribute("id", e.key)
                div_range.innerHTML = "<strong>" + e.key + ": </strong>"
            let select_from  = document.createElement("select")
            let select_to  = document.createElement("select")
                select_from.setAttribute("id", "search_from_" + e.key)
                select_to.setAttribute("id", "search_to_" + e.key)

            for (let i=0; i<array.length; i++){
                let option_form = document.createElement("option")
                let option_to = document.createElement("option")

                select_from.appendChild(option_form).innerHTML = option_form.value = array[i]
                select_to.appendChild(option_to).innerHTML = option_to.value = select_to.value = array[i]
                select_to.selectedIndex = 0
                select_to.selectedIndex = array.length-1
            }
            div_range.appendChild(select_from) 
            div_range.appendChild(select_to)
            div.appendChild(div_range)           
        }
        
    }
    ///////// реализация события
    onKey(e){
        let phrase = e.target.value 
        let resultDiv = document.querySelector('.result')
        let key = e.target.parentNode.id
        let result = this.model 
            resultDiv.innerText = "" 
        let schema = this.model[0].getSchema()
        let schemaKeys = Object.keys(this.model[0].getSchema())

        for (let i=0; i<schemaKeys.length; i++){    
            let result_h =""
            resultDiv.innerText = ""
            if (schema[schemaKeys[i]].type == 'text' && phrase!=""){                               
                let phrase_h = document.getElementById("search_" + schemaKeys[i]).value
                result_h = result.filter( value => value[schemaKeys[i]].toLowerCase().indexOf(phrase_h.toLowerCase()) != -1 )
            }
            if (schema[schemaKeys[i]].type == 'checkbox' && this.getCheckedBoxes(schemaKeys[i])!=""){                
                let phrase_h = this.getCheckedBoxes(schemaKeys[i])                
                result_h = result.filter( value => phrase_h.indexOf(value[schemaKeys[i]]) != -1 )
            }
            if (schema[schemaKeys[i]].type == 'select'){                             
                let phrase_h = document.getElementById("search_" + schemaKeys[i]).value
                if (phrase_h != "all")
                    result_h = result.filter( value => phrase_h.indexOf(value[schemaKeys[i]]) != -1 )
            }
            if (schema[schemaKeys[i]].type == 'range'){                             
                let phrase_from = document.getElementById("search_from_" + schemaKeys[i]).value
                let phrase_to = document.getElementById("search_to_" + schemaKeys[i]).value

                result_h = result.filter( value => value[schemaKeys[i]].getFullYear() >= phrase_from &&  value[schemaKeys[i]].getFullYear() <= phrase_to)
            }
            if (typeof result_h == 'object')
                result = result_h
        }
        result = result.filter( value => value.render(resultDiv) )
    }
    //////////////  возвращает строку значений выбранных здементов checkbox
    getCheckedBoxes(parent){
        let phrase = ""
        parent = document.getElementById(parent)
        for (let i=0; i<(parent.childElementCount-1)/2; i++)
            if (parent.children[2*i+1].checked == true)  phrase += parent.children[2*i+1].value
        return phrase
    }
    //////////////////  удаляет повтооряющиеся элементы
    uniqArray(array){
        let i, q
        for ( q=1, i=1; q<array.length; ++q ) 
            if ( array[q] != array[q-1] ) 
                array[i++] = array[q];        
      
        array.length = i;
        return array;
    }

    /////////////////создание массива из возможных значений
    createArray(array, key){
        let array_temp = []
        for (let i=0; i<array.length; i++)
            array_temp[i] = array[i][key]
        return array_temp
    }

}