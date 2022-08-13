'use strict';

const data_link = 'http://localhost:3000/courses';
const cources_container = document.querySelector('.main-body');




function fetch_courses() {
    return new Promise((resolve, reject) => {
        fetch(data_link)
            .then((response) => response.json())
            .then((jsonData) => resolve(jsonData))
    });
};

fetch_courses().then(function(data) {
    data.forEach((course) => generate_course_cards(course));
});



function generate_course_cards(course_data) {
    const course_img = course_data.image;
    const course_title = course_data.title;
    const course_aurthor = course_data.author;
    const course_price = course_data.price;

    const html = `
    <a >
    <img src=${course_img}>
    <h3 class="blacklink">${course_title}</h3>
    <h5 class="garylink">${course_aurthor}</h5>
    <h3 class="blacklink">${course_price}</h3>
    </a>`;
    cources_container.insertAdjacentHTML('beforeend', html);

}

document.querySelector('#search-buttomn').addEventListener('click', function() {

    search();

})

function search() {
    const search_item = document.querySelector('#search_input').value;
    cources_container.innerHTML = '';
    document.querySelector('header').style.display = "none";

    fetch_courses().then((data) => {
        console.log('errrrrrrrrrrrrrr');
        const filtered_data = filtering(data, search_item);
        console.log(filtered_data);
        filtered_data.forEach((course) => generate_course_cards(course));

    });
}


function filtering(data, item) {
    return data.filter((course) => {
        return course.title.toLowerCase().includes(item.toLowerCase());
    })
}