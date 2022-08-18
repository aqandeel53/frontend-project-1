'use strict';

const data_link = 'http://localhost:3000';
const cources_container = document.querySelector('.main-body');

const buttonss = {
    "butt1": "python",
    "butt2": "excel",
    "butt3": "web",
    "butt4": "js",
    "butt5": "data",
    "butt6": "aws",
    "butt7": "draw"
}


function fetch_courses(linkk) {
    return new Promise((resolve, reject) => {
        return fetch(linkk)
            .then((response) => response.json())
            .then((jsonData) => resolve(jsonData))
    });
};

let fetched_courses = fetch_courses(`${data_link}/courses?name=python`);

function resolve_data(f_data) {
    Promise.resolve(f_data).then(function(data) {
        generate_section_info(data[0]);
        data = data[0]["courses"];
        data.forEach((course) => generate_course_cards(course));
    });
}
resolve_data(fetched_courses);

function generate_section_info(section_data) {
    //  console.log(section_data);
    let section_name = section_data.name;
    let section_header = section_data.header;
    let section_description = section_data.description;

    let page_header = document.querySelector('#s_title');
    let page_description = document.querySelector('#s_discr');
    let page_button = document.querySelector('#er');

    page_header.innerHTML = section_header;
    page_description.innerHTML = section_description;
    page_button.innerHTML = 'Explore ' + section_name;

}

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
    console.log(fetched_courses);
    Promise.resolve(fetched_courses).then((data) => {
        data = data[0]["courses"];
        console.log(data);
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

function set_black(butt) {
    const old_button = document.querySelector('.butt-active');
    const new_buttom = document.getElementById(butt);
    old_button.classList.remove('butt-active')
    new_buttom.classList.add('butt-active')
}
const buttons_sections = () => {
    for (const btn_Id in buttonss) {
        const btn = document.getElementById(btn_Id);
        btn.addEventListener("click", function() {
            cources_container.innerHTML = '';
            fetched_courses = fetch_courses(`${data_link}/courses?name=${buttonss[btn_Id]}`);
            resolve_data(fetched_courses);
            set_black(btn_Id);
        })
    }
}
const cat_card_generator = ({ image, title }) => {
    const html = `
    <div class="col-lg-3 col-md-4 col-xs-12 justify-content-center d-flex">
                <a >
                    <div ><img  class="grid-img" src="${image}"></div>
                    <div class="cat_card"> <span>${title}</span> </div>
                </a>
            </div>
            `
    return html;
}

const view_cat = async() => {
    const cat_container = document.getElementById("cat_photo_container");
    const cats_data = await fetch(`${data_link}/categories`)
        .then(x => x.json());
    cats_data.forEach(
        element => {
            cat_container.appendChild(new DOMParser().parseFromString(cat_card_generator(element), "text/html")
                .body
                .firstElementChild)
        });
}
view_cat();
buttons_sections();