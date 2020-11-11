function testFakeUser(n=10){
    let genders = [ 'Female' , 'Male', 'Undecided' ];
    let online = []
    let users = []
    

    console.log("%cSTARTING USER TESTS", "color: red")

    while (n--){
        let user = new User ( 
                        faker.name.findName(), 
                        faker.image.avatar(80.80), 
                        faker.random.arrayElement(genders), 
                        faker.address.countryCode(), 
                        faker.date.between("1970", "2000")
                        )

        user.render(document.querySelector('.messages'))
        users.push(user)
    }


    /////////создание компонента search с передачей ему массива имен пользователей 
    let search = new Search ('nickname', users)
        search.render( document.body.querySelector('.main') )

  //  console.log(users_nicknames)
    console.log("%cENDING USER TESTS", "color: red")
}