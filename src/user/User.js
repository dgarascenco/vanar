class User {
    constructor(nickname, avatar, gender, location, dob){
        this.nickname = nickname
        this.avatar = avatar
        this.gender = gender
        this.location = location
        this.dob = dob
        this.online = Math.random() <= 0.5
    }

    getType(){
        return "users"
    }

    render(rootElement, posts =[], mode = "sm"){ 
        let currentDate = new Date()

        ////////// элемент пользователя в чате
        let div = document.createElement('div')
            div.className = "user-" + mode
            div.appendChild( document.createElement('img') )
            div.children[0].src = this.avatar
            div.addEventListener("click", function(e){
                let div_message = document.body.querySelector('.main')
                    div_message.innerText = ""
                    console.log(posts)                         
                    posts.forEach(value => {
                                                value.render(div_message)                  
                                            })
            })

        ///////// имя пользователя
        let h_nickname = document.createElement('p')
            h_nickname.innerText = this.nickname
            if ( this.gender == "Female") h_nickname.style.color = "red"        //    красный - цвет женского пола 
            else if ( this.gender == "Male") h_nickname.style.color = "blue"    //    синий - цвет мужского пола  
            else  h_nickname.style.color = "gray"                               //    серый - цвет остального пола

        // ///////// индикатор "онлайн"
        let h_online = document.createElement('div')
            h_online.className = "circle"            
            h_online.style.width = h_online.style.height = "5px"
            if (this.online) h_online.style.backgroundColor = "green"           // зеленый - если пользователь в сети
            else h_online.style.backgroundColor = "red"  
                                   // красный - если пользователь не в сети
        div.appendChild(h_online)
        div.appendChild(h_nickname) 


        if (mode == "md"){            
            h_nickname.style.fontSize = "20px"
            h_nickname.innerHTML = this.nickname           
            h_online.style.width = h_online.style.height = "10px"
            div.innerHTML += this.location  + " - " + this.dob.getFullYear() + "<hr>"
        }
        
        if (mode == "lg"){
            h_nickname.style.fontSize = "30px"
            let h_gender = document.createElement('p')
                h_gender.innerText = "Sex: " + this.gender
            let h_location = document.createElement('p')
                h_location.innerText += "From: " + this.location
            let h_dob = document.createElement('p')
                h_dob.innerText += "Born: " + this.dob                
            h_online.style.width = h_online.style.height = "20px"

            div.appendChild(h_gender)
            div.appendChild(h_location)
            div.appendChild(h_dob)
        }

        rootElement.appendChild(div)
    }

    getSchema(){
        return {
            nickname: {
                type: "text",
                key: "nickname"
            },
            gender: {
                type: "checkbox",
                key: "gender"
            },
            location: {
                type: "select",
                key: "location"
            },
            dob: {
                type: "range",
                key: "dob"
            },
            online: {
                type: "checkbox",
                key: "online"
            }            
        }
    }
}