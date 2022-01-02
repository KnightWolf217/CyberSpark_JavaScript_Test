// Write Javascript Here
const baseUrl = "http://localhost:3000/users";
const headers = {
    'Content-type': 'application/json; charset=UTF-8'
};



getUsersRequest().then(users => {
    //This function has been implemented already for you
    const tableEl = document.getElementById("table");
    for (const user of users) {
        tableEl.appendChild(createTableRow(user))
    }
})








function addNewUser() {
    //TODO: implement me
    let user = prompt("Add User");
    if (user != null && user != "") {
        let obj = {
            "name": user
        }
        createUserRequest(obj).then(res =>
            location.reload()
        );
    }
}



function editUser(id, userName) {
    //TODO: implement me
    let user = prompt("Edit User", userName);
    if (user != null && user != "") {
        let obj = {
            "id": id,
            "name": user
        }
        updateUserRequest(obj).then(res =>
            location.reload()
        );
    }
}

function deleteUser(id) {
    //TODO: implement me
    let msg = confirm("Are you sure you want to delete this entry?");
    if (msg) {
        deleteUserRequest(id).then(res =>
            location.reload()
        );
    }

}




//CRUD HELPER METHODS
function createUserRequest(user) {
    return fetch(baseUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(user),
    }).then(response => response.json())
}


function getUsersRequest() {
    return fetch(baseUrl, {
        method: 'GET',
    }).then(response => response.json())
}

function deleteUserRequest(id) {
    return fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
    }).then(response => response.json())
}


function updateUserRequest(user) {
    return fetch(`${baseUrl}/${user.id}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(user),
    }).then(response => response.json())
}


//HELPER METHODS
function createTableRow(user) {
    var tr = document.createElement("tr");
    tr.innerHTML = `<td>${user.name}</td> <td><a href="#" onclick="editUser(${user.id}, '${user.name}')">Edit</a> / <a href="#" onclick="deleteUser(${user.id})">Delete</a></td>`;
    return tr;
}
