 $(document).ready(function () {
  (function(){
    $('.loading').fadeOut(1000)
    $(document.body).css('overflow',"visible")
  }())
  
  let = finalRes = [];
  let = Recipy = [];
  let = categ = [];
  let = areaRes = [];
  let = intgRes = [];

  async function getMeal(id) {
    let respose = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    respose = await respose.json();
    Recipy = respose.meals[0];
    displayRecipes();
    $("#recipes").fadeIn(500);
  }
  async function search(
    api = `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  ) {
    let respose = await fetch(api);
    respose = await respose.json();
    finalRes = respose.meals;
    if (respose.meals != null) {
      display();
    }
  }
  search();
  async function categry() {
    let respose = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    respose = await respose.json();
    categ = respose.categories;
    displaycateg();
    $("#categories").fadeIn(500);
  }
  async function area() {
    let respose = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    respose = await respose.json();
    areaRes = respose.meals;
    displayArea();
    $("#area").fadeIn(500);
  }
  async function intg() {
    let respose = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    respose = await respose.json();
    intgRes = respose.meals;
    displayingredients();
    $("#ingredients").fadeIn(500);
  }
  async function byCAI(type, search) {
    let respose = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?${type}=${search}`
    );
    respose = await respose.json();
    finalRes = respose.meals;
    display();
    $("#Home").fadeIn(500);
  }
  //////////////////Events/////////////////////////
  $(".searchli").click(function () {
    $("#search").fadeIn(300);
    $("section").not("#search").fadeOut();
  });
  $(".areali").click(function () {
    area();
    $("section").fadeOut();
    $("#area").fadeIn(100);
  });
  $(".ingredientsli").click(function () {
    intg();
    $("section").fadeOut();
    $("#ingredients").fadeIn(100);
  });
  $(".byName").keyup(function () {
    search(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.value}`
    );
    $("#Home").fadeIn(300);
  });
  $(".byfrstlter").keyup(function () {
    if (this.value != "") {
      search(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${this.value}`
      );
      $("#Home").fadeIn(300);
    }
  });

  $(".categoriesli").click(function () {
    $("#categories").fadeIn(300);
    $("section").not("#categories").fadeOut();
    categry();
  });

  $(document).on("click", ".itemC ", function () {
    byCAI($(this).attr("type"), $(this).attr("datasave"));
  });

  $(document).on("click", ".itemR", function () {
    getMeal($(this).attr("data-id"));
  });
  $(document).on("click", ".itemArea", function () {
    byCAI($(this).attr("type"), $(this).attr("datasave"));
    $("#area").fadeOut(100);
  });
  $(document).on("click", ".itemingr", function () {
    byCAI($(this).attr("type"), $(this).attr("datasave"));
    $("#ingredients").fadeOut(100);
  });
  ///////////////Dispaly//////////////////////////////

  function display() {
    let cartona = ``;
    for (let i = 0; i < finalRes.length; i++) {
      cartona += `<div class="col-md-4 col-lg-3 col-sm-6 p-4 ">
        <div class="itemR" data-id="${finalRes[i].idMeal}" > 
                <figure class="position-relative overflow-hidden">
                    <img class="w-100" src="${finalRes[i].strMealThumb}" alt="FoodItem">
                    <div class="layer bg-light bg-opacity-75 position-absolute start-0 end-0 top-0 bottom-0 layer d-flex align-items-center">
                        <h2 class="display-6 px-3 text-dark">${finalRes[i].strMeal}</h2>
                    </div>
                </figure>
            

        </div>
    </div>`;
      $("#displayItem").html(`${cartona}`);
    }
    $("#categories").fadeOut();
    $("html, body").animate({
      scrollTop: 0
  }, 500)
  }

  function displaycateg() {
    let cartona = ``;
    for (let i = 0; i < categ.length; i++) {
      cartona += `<div class="col-md-4 col-lg-3  col-sm-6">
        <div class="itemC" type="c" datasave="${categ[i].strCategory}">
            <a href="#">
                <figure class="position-relative overflow-hidden">
                    <img class="w-100 " src="${
                      categ[i].strCategoryThumb
                    }" alt="FoodItem">
                    <div class="layer bg-light bg-opacity-75 position-absolute start-0 end-0 top-0 bottom-0 layer d-flex flex-column align-items-center justify-content-center p-3">
                        <h2 class="display-6 text-center  catgrh2  px-3 text-dark">${
                          categ[i].strCategory
                        }</h2>
                        <p class="text-dark text-center fw-semibold">${
                          categ[i].strCategoryDescription.split(" ").length > 15
                            ? categ[i].strCategoryDescription
                                .split(" ")
                                .splice(0, 15)
                                .join(" ") + "..."
                            : categ[i].strCategoryDescription
                        }</p>
                    </div>
                </figure>
            </a>

        </div>
    </div>`;
      $("#htmlcatg").html(`${cartona}`);
    }
    $("section").fadeOut().not("#categories");
    $("html, body").animate({
      scrollTop: 0
  }, 500)
  }

  function displayRecipes() {
    let reshtml = ``;
    for (let i = 1; i <= 20; i++) {
      if (Recipy[`strIngredient${i}`]) {
        reshtml += `<li class="bg-warning bg-opacity-25 d-inline px-3 m-2 py-2 rounded-3">${
          Recipy[`strIngredient${i}`]
        }</li>`;
      }
    }

    let taghtml = ``;
    for (let j = 1; j <= 20; j++) {
      if (Recipy[`strMeasure${j}`] && Recipy[`strMeasure${j}`] != " ") {
        taghtml += `<li class="bg-warning bg-opacity-25 d-inline px-3 m-2 py-2 rounded-3">${
          Recipy[`strMeasure${j}`]
        }</li>`;
      }
    }

    $(".Recipy").html(`<div class="col-lg-4">
    <figure>
        <img class="w-100" src="${Recipy.strMealThumb}" alt="Food Item">
        <figcaption class="text-center">
            <p class=" display-6">${Recipy.strMeal}</p>
        </figcaption>
    </figure>

</div>
<div class="col-lg-8">
    <div class="content">
        <h2>Instructions
        </h2>
        <p>${Recipy.strInstructions}</p>
        <h5>Area : <span class="fw-lighter">${Recipy.strArea}</span> </h5>
        <h5>Category  : <span class="fw-lighter">${Recipy.Chicken} </span> </h5>
        <div>
            <h4>Recipes :
            </h4>
            <ul class="px-0 reshtml py-2 d-flex flex-wrap">
            
                

                
            </ul>
        </div>
        <div>
            <h4>Tags :
            </h4>
            <ul class="px-0 py-2 d-flex flex-wrap taghtml">
            </ul>
        </div>
        <div>
            <a class="px-3 py-2 Source rounded-3 bg-success text-white" target="_blank" href="${
              Recipy.strInstructions == null
                ? $(".Source").hide(200)
                : Recipy.strSource
            }">Source</a> 
            <a class="px-3 py-2 YouTube rounded-3 bg-danger text-white" target="_blank" href="${
              Recipy.strYoutube == null
                ? $(".YouTube").hide(200)
                : Recipy.strYoutube
            }">YouTube</a> 
        </div>
    </div>


</div>`);
    $(".reshtml").html(`${reshtml}`);
    $(".taghtml").html(`${taghtml}`);
    $("section").fadeOut().not("#Recipes");
    $("html, body").animate({
      scrollTop: 0
  }, 500)
  }

  function displayArea() {
    let cartona = ``;
    for (let i = 0; i < areaRes.length; i++) {
      cartona += `<div type="a" class="col-md-4 col-lg-3  col-sm-6 itemArea"  datasave="${areaRes[i].strArea}">
      <div class="city p-4 shadow-lg bg-dark bg-opacity-10 " >
          <a class="text-center text-danger" href="#">
              <i class="fa-solid fa-4x fa-house-chimney"></i>
              <p class="display-6 text-white ">${areaRes[i].strArea}</p>
          </a>
      </div>
      
     
  </div>`;
      $(".htmlarea").html(`${cartona}`);
    }
  }
  function displayingredients() {
    let cartona = ``;
    for (let i = 0; i < 20; i++) {
      cartona += `<div type="i" datasave="${
        intgRes[i].strIngredient
      }" class="col-md-4 col-lg-3  col-sm-6 itemingr ">
      <div class="city shadow-lg bg-dark bg-opacity-10 py-2 px-3 " >
          <a class="text-center text-success" href="#">
              <i class="fa-solid fa-4x fa-bowl-food"></i>
              <h5 class="display-6 text-white ">${intgRes[i].strIngredient}</h5>
              <p class="   text-white ">${
                intgRes[i].strDescription.split(" ").length > 15
                  ? intgRes[i].strDescription
                      .split(" ")
                      .splice(0, 15)
                      .join(" ") + "..."
                  : intgRes[i].strDescription
              }</p>
          </a>
      </div>
      
     
  </div>`;
      $(".htmlingr").html(`${cartona}`);
    }
    $("html, body").animate({
      scrollTop: 0
  }, 500)
  }

  /////////////////////NavAnimate////////////////////////////////
  let linksNavWidth = $(".linksNav").outerWidth();
  $(".linksNav").css("left", `-${linksNavWidth}px`);

  $(".naviconn").click(function () {
    if ($(".iconNav").css("left") == "0px") {
      $(".linksNav").animate({ left: "0" }, 500);
      $(".iconNav").animate({ left: `${linksNavWidth}px` }, 500);
      $(document.body).animate({ "padding-left": linksNavWidth }, 500);
      $(".animelink").animate({ height: "30%" }, 2000);

      $(this).removeClass("fa-bars").addClass("fa-xmark");
    } else {
      $(".linksNav").animate({ left: `-${linksNavWidth}px` }, 500);
      $(".iconNav").animate({ left: `0` }, 500);
      $(document.body).animate({ "padding-left": "0px" }, 500);
      $(this).removeClass("fa-xmark").addClass("fa-bars");
      $(".animelink").animate({ height: "85%" }, 300);
    }
  });
  ////////////////////////validtion////////////////////////
  $(".contactUsli").click(function () {
    $("section").hide();
    $("#form").slideDown(1000);
  });

  $(".inputName").keyup(function () {
    if (validtionName() == true) {
      $(this).addClass("is-valid").siblings().addClass("is-valid").fadeOut(200);
    } else {
      $(this)
        .removeClass("is-valid")
        .siblings()
        .removeClass("is-valid")
        .fadeIn(500);
    }
    displayBtn();
  });
  $(".inputEmail").keyup(function () {
    if (validtionEmail() == true) {
      $(this).addClass("is-valid").siblings().addClass("is-valid").fadeOut(200);
    } else {
      $(this)
        .removeClass("is-valid")
        .siblings()
        .removeClass("is-valid")
        .fadeIn(500);
    }
    displayBtn();
  });
  $(".inputPhone").keyup(function () {
    if (validtionPhone() == true) {
      $(this).addClass("is-valid").siblings().addClass("is-valid").fadeOut(200);
    } else {
      $(this)
        .removeClass("is-valid")
        .siblings()
        .removeClass("is-valid")
        .fadeIn(500);
    }
    displayBtn();
  });
  $(".inputPassword").keyup(function () {
    if (validtionPass() == true) {
      $(this).addClass("is-valid").siblings().addClass("is-valid").fadeOut(200);
    } else {
      $(this)
        .removeClass("is-valid")
        .siblings()
        .removeClass("is-valid")
        .fadeIn(500);
    }
    displayBtn();
  });
  $(".inputAge").keyup(function () {
    if (validtionAge() == true) {
      $(this).addClass("is-valid").siblings().addClass("is-valid").fadeOut(200);
    } else {
      $(this)
        .removeClass("is-valid")
        .siblings()
        .removeClass("is-valid")
        .fadeIn(500);
    }
    displayBtn();
  });
  $(".inputRePassword").keyup(function () {
    if ($(this).val() == $(".inputPassword").val()) {
      $(this).addClass("is-valid").siblings().addClass("is-valid").fadeOut(200);
    } else {
      $(this)
        .removeClass("is-valid")
        .siblings()
        .removeClass("is-valid")
        .fadeIn(500);
    }
    displayBtn();
  });

  function displayBtn() {
    if (
      validtionName() == true &&
      validtionEmail() == true &&
      validtionPhone() == true &&
      validtionPass() == true &&
      validtionAge() == true &&
      $(".inputRePassword").val() == $(".inputPassword").val()
    ) {
      $(".subBtnn").removeAttr("disabled");
    } else {
      $(".subBtnn").attr("disabled", "");
    }
  }

  function validtionName() {
    let regex = /^[a-z]+$/i;
    return regex.test($(".inputName").val().trim());
  }
  function validtionEmail() {
    let regex = /^.+@.+\.com$/i;
    return regex.test($(".inputEmail").val().trim());
  }
  function validtionPass() {
    let regex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/i;
    return regex.test($(".inputPassword").val().trim());
  }
  function validtionPhone() {
    let regex = /^(002)?01[0-1-2-5][0-9]{8}$/i;
    return regex.test($(".inputPhone").val().trim());
  }
  function validtionAge() {
    let regex = /^([0-9]{2}|[1-9])$/i;
    return regex.test($(".inputAge").val().trim());
  }
});
