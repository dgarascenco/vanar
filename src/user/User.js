class User {
    constructor(nickname, avatar, gender, location, dob){
        this.nickname = nickname
        this.avatar = avatar
        this.gender = gender
        this.location = location
        this.dob = dob
        this.online = Math.random() <= 0.5
    }

    render(rootElement, mode = "sm"){ 

        let div = document.createElement('div')
            div.className = "user-" + mode        
            div.appendChild( document.createElement('img') )
            div.children[0].src = this.avatar

        let h_online = document.createElement('div')
            h_online.className = "circle"            
            h_online.style.width = h_online.style.height = "5px"


        let online = Math.random() >= 0.5;


        if (online == true) h_online.style.backgroundColor = "green"
        else h_online.style.backgroundColor = "red"

        let h_nickname = document.createElement('p')
            h_nickname.innerText = this.nickname
        
        div.appendChild(h_online)        
        div.appendChild(h_nickname) 

        if (mode == "md"){
            let h_nickname = document.createElement('h2')
                h_nickname.innerText = this.nickname

            div.appendChild(h_nickname)

            h_online.style.width = h_online.style.height = "10px"
        }
        
        if (mode == "lg"){
            let h_nickname = document.createElement('h1')
                h_nickname.innerText = this.nickname

            let h_gender = document.createElement('h2')
                h_gender.innerText = "Sex: " + this.gender
                if ( this.gender == "female") h_gender.style.color = "red"
                else if ( this.gender == "male") h_gender.style.color = "blue"
                else  h_gender.style.color = "gray"

            let h_location = document.createElement('h2')
                h_location.innerText += "From: " + this.location

            let h_dob = document.createElement('h2')
                h_dob.innerText += "Born: " + this.dob
                
            h_online.style.width = h_online.style.height = "20px"

            div.appendChild(h_online)
            div.appendChild(h_nickname)
            div.appendChild(h_gender)
            div.appendChild(h_location)
            div.appendChild(h_dob)
        }

        rootElement.appendChild(div)
    }
}