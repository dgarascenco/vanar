class Search {

    constructor(type = 'nickname', searchArray){       
        this.type = type 
        this.searchArray = searchArray
    }

    render (root){
        let div = document.createElement('div')
            div.classList.add("search")
        let input = document.createElement('input')
        let divResult = document.createElement('div')
             divResult.classList.add("result")

        switch (this.type){
            case 'nickname':   input.placeholder = "Search for users..."
            ////// more options...
        }

        div.appendChild(input)
        div.appendChild(divResult)
        root.appendChild(div)

        let searchArray = this.searchArray
        input.addEventListener("keyup", function (e){
                                            let div = document.querySelector('.result')
                                                div.textContent = ""

                                                for (i=0; i<searchArray.length; i++)
                                                    if ( searchArray[i].toLowerCase().indexOf(e.target.value.toLowerCase()) != -1){
                                                        console.log(searchArray[i])
                                                        let h = document.createElement('h4')
                                                        h.innerText  = searchArray[i]
                                                        div.appendChild(h)
                                                    }    
                                        })
       
    }
}