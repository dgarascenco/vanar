class Post {

    constructor(title, body, author){       
        this.title = title
        this.body = body
        this.author = author
    }
    getType(){
        return "post"
    }
    render (rootElement, mode = "sm"){
        ////////// 
        let div = document.createElement('div')
            div.className = "post-" + mode
        let title = document.createElement('h3')
            title.innerText = this.author.nickname + ": " + this.title
        let body = document.createElement('p')
            body.innerText = this.body

        div.appendChild(title)
        div.appendChild(body)
        rootElement.appendChild(div)
    }

}