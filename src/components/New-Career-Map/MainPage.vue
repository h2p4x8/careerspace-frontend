<template>
  <v-container function-chose-bubles v-if='!selectedFunction_get'>
    <v-layout row wrap v-if='$vuetify.breakpoint.mdAndUp'>
      <v-flex md12 offset-md2 xs7 offset-xs3 function-chose-title>
        Выбери функцию
      </v-flex>
      <v-flex md8 offset-md2>
        <v-layout :row='$vuetify.breakpoint.mdAndUp' :wrap='$vuetify.breakpoint.mdAndUp' :column='$vuetify.breakpoint.smAndDown'>
          <v-flex  xs2 v-for='functionTitle in functionList_get' bubble-box text-xs-center @click='choseFunction({payload: { functionId: functionTitle.id } }), functionChoosen = true, functionId = functionTitle.id'>
            <div class="function-bubble">
              <p>{{ functionTitle.name }}</p>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
    <v-flex xs8 offset-xs1 >
      <p>Зайди на сайт с ноутбука или со стационарного компьютера. С телефона просматривать карту неудобно, мы пробовали.</p>
    </v-flex>
    </v-layout>
  </v-container>
  <v-container career-map v-else>
    <v-layout row wrap fill-height>
        <v-flex shrink container-map>
        <v-layout row wrap>
        <v-flex shrink :outer-container-map='$vuetify.breakpoint.height < 900' :style='getMapHeight'>
        <CareerMapMain :lines='circleLinesInMap_get'
                       :height='height_get'
                       :width='width_get'
                       :circles='circleLevelsInMap_get'
                       :positions = 'positionsInMap_get'
                       :filteredPositionsUpOnHover = 'filteredPositionsUpOnHover_get'
                       :filteredPositionsHorizOnHover = 'filteredPositionsHorizHover_get'
                       :filteredPositionsDisabledOnHover = 'filteredPositionsDisabledHover_get'
                       :selectedPosition='positionSelected_get'
                       :positionOnHover='positionOnHover_get'
                       :filteredPositionsUpOnPosSelected= 'filteredPositionsUpOnPosSelected_get'
                       :filteredPositionsHorizOnPosSelected = 'filteredPositionsHorizOnPosSelected_get'
                       :filteredPositionsDisabledOnPosSelected = 'filteredPositionsDisabledOnPosSelected_get'
                       :linksArcOnHover='linksArcOnHover_get'
                       :historyLinks='historyLinks_get'
                       :historyPositions='historyPositions_get'
                       :positionSelected='positionSelected_get'
                       :subfunctionTitlesPath='subfunctionTitlesPath_get'
                       :positionsNoDisplayOnHover='positionsNoDisplayOnHover_get'
                       :positionsNoDisplay='positionsNoDisplay_get'
                       @mouseOverPosition='mouseOverPosition'
                       @mouseOutPosition='mouseOutPosition'
                       @selectedPosition='positionSelected'
                       :positionsOnBlurHover='positionsNoDisplayBlurHover_get'
                       :positionsOnBlurSelect='positionsNoDisplayBlurSelect_get'
                     />
            </v-flex>
                     <v-flex xs1 main-track-box align-self-end>
                       <div class='track-box' v-if='showTrack&&positionSelected_get'>
                         <div class='track-title'>Карьерный путь</div>
                         <CareerTrack :height='heightForTrack_get'
                                      :width='widthForTrack_get'
                                      :historyPositions='historyPositions_get'
                                      :amountOfLevels='levelList_get.length'
                                      :functionList='functionList_get'
                                      :subfunctionList='subfunctionList_get'
                                      @backToPosition = 'backToPosition'/>
                       </div>
                       <v-btn fab dark
                              color="#009954"
                              heigth='60'
                              @click="showTrack = !showTrack"
                              v-if='positionSelected_get'>
                              <svg width="9" height="37" viewBox="0 0 9 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <line x1="4.5" y1="19" x2="4.5" y2="37" stroke="white"/>
                              <line x1="4.5" y1="3" x2="4.5" y2="21" stroke="white"/>
                              <circle cx="4.5" cy="4.5" r="4.5" fill="white"/>
                              <circle cx="4.5" cy="18.5" r="4.5" fill="white"/>
                              <circle cx="4.5" cy="32.5" r="4.5" fill="white"/>
                              </svg>
                       </v-btn>
                     </v-flex>

                     </v-layout>
      </v-flex>
      <v-flex md3 info-block xs12 :offset-xs8='!is_lockSidebar' :offset-xs9='is_lockSidebar'>
        <v-layout row wrap>
        <v-flex xs12>
          <v-layout row position-info wrap v-if='positionSelectedInfo_get && infoShow && $vuetify.breakpoint.mdAndUp'>
            <v-flex xs10 button-box v-if='vacancyListDyId_get.length > 0'>
              <v-btn block class='button' depressed color='#E85218' dark @click='showVacancies'>
                {{ vacancyListDyId_get.length }} {{ declOfNum(vacancyListDyId_get.length, ['вакансия', 'вакансии', 'вакансий']) }}
              </v-btn>
            </v-flex>

              <v-flex xs10 title-name >
                Что делает
              </v-flex>
              <v-flex xs10 position-description>
                <p v-for='el in positionSelectedInfo_get.fullDescription.split("/n")'>
                  {{ el }}
                </p>
              </v-flex>
              <v-flex xs10 title-name >
                Сколько зарабатывает
              </v-flex>
              <v-flex xs10 salary-info v-if='positionSelectedInfo_get.salaryStart&&positionSelectedInfo_get.salaryEnd'>
                {{ positionSelectedInfo_get.salaryStart.toLocaleString('ru-RU') + '-' + positionSelectedInfo_get.salaryEnd.toLocaleString('ru-RU') + ' руб/мес'}}
              </v-flex>
          </v-layout>

          <v-layout row wrap info-about-map v-if='!positionSelected_get'>
            <v-flex xs10 v-if='!positionSelectedInfo_get && $vuetify.breakpoint.mdAndUp' start-title>
              Как пользоваться картой
            </v-flex>
            <v-flex xs10  v-if='!positionSelectedInfo_get' start-text>
              Выбери позицию, чтобы увидеть вакансии, описание и возможные переходы.
            </v-flex>
            <v-flex shrink position-bubble align-self-center>
              <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32.5" cy="32.5" r="32" fill="white" stroke="#E85218"/>
              <path d="M14.5003 27.3545H14.8489C15.1748 27.3545 15.4186 27.2907 15.5804 27.1631C15.7422 27.0332 15.823 26.8452 15.823 26.5991C15.823 26.3507 15.7547 26.1673 15.618 26.0488C15.4835 25.9303 15.2716 25.8711 14.9822 25.8711H14.5003V27.3545ZM16.8929 26.5615C16.8929 27.0993 16.7243 27.5106 16.387 27.7954C16.0521 28.0802 15.5747 28.2227 14.9549 28.2227H14.5003V30H13.4407V25.0029H15.0369C15.643 25.0029 16.1033 25.134 16.4178 25.396C16.7345 25.6558 16.8929 26.0443 16.8929 26.5615ZM23.0719 27.4946C23.0719 28.3218 22.8668 28.9575 22.4566 29.4019C22.0465 29.8462 21.4586 30.0684 20.693 30.0684C19.9273 30.0684 19.3395 29.8462 18.9293 29.4019C18.5191 28.9575 18.3141 28.3195 18.3141 27.4878C18.3141 26.6561 18.5191 26.0215 18.9293 25.584C19.3417 25.1442 19.9319 24.9243 20.6998 24.9243C21.4677 24.9243 22.0545 25.1453 22.4601 25.5874C22.8679 26.0295 23.0719 26.6652 23.0719 27.4946ZM19.4249 27.4946C19.4249 28.0529 19.5309 28.4733 19.7428 28.7559C19.9547 29.0384 20.2714 29.1797 20.693 29.1797C21.5383 29.1797 21.961 28.618 21.961 27.4946C21.961 26.369 21.5406 25.8062 20.6998 25.8062C20.2783 25.8062 19.9604 25.9486 19.7462 26.2334C19.532 26.516 19.4249 26.9364 19.4249 27.4946ZM27.7572 28.6123C27.7572 29.0635 27.5943 29.4189 27.2685 29.6787C26.9449 29.9385 26.4937 30.0684 25.9149 30.0684C25.3817 30.0684 24.9101 29.9681 24.4999 29.7676V28.7832C24.8371 28.9336 25.122 29.0396 25.3544 29.1011C25.5891 29.1626 25.8033 29.1934 25.997 29.1934C26.2294 29.1934 26.4071 29.1489 26.5302 29.0601C26.6555 28.9712 26.7182 28.839 26.7182 28.6636C26.7182 28.5656 26.6908 28.479 26.6361 28.4038C26.5814 28.3263 26.5006 28.2523 26.3935 28.1816C26.2886 28.111 26.0733 27.9982 25.7475 27.8433C25.4421 27.6997 25.2131 27.5618 25.0604 27.4297C24.9078 27.2975 24.7859 27.1437 24.6947 26.9683C24.6036 26.7928 24.558 26.5877 24.558 26.353C24.558 25.911 24.7073 25.5635 25.0058 25.3105C25.3065 25.0576 25.7213 24.9312 26.2499 24.9312C26.5097 24.9312 26.7569 24.9619 26.9916 25.0234C27.2286 25.085 27.4758 25.1715 27.7333 25.2832L27.3915 26.1069C27.1249 25.9976 26.9039 25.9212 26.7284 25.8779C26.5552 25.8346 26.3843 25.813 26.2157 25.813C26.0152 25.813 25.8614 25.8597 25.7543 25.9531C25.6472 26.0465 25.5937 26.1685 25.5937 26.3188C25.5937 26.4123 25.6153 26.4943 25.6586 26.5649C25.7019 26.6333 25.7702 26.7005 25.8637 26.7666C25.9594 26.8304 26.1838 26.9466 26.537 27.1152C27.0041 27.3385 27.3243 27.563 27.4975 27.7886C27.6706 28.0119 27.7572 28.2865 27.7572 28.6123ZM29.363 30V25.0029H30.4226V30H29.363ZM34.3081 30H33.2485V25.8848H31.8916V25.0029H35.665V25.8848H34.3081V30ZM37.1341 30V25.0029H38.1937V30H37.1341ZM44.6871 27.4946C44.6871 28.3218 44.482 28.9575 44.0719 29.4019C43.6617 29.8462 43.0738 30.0684 42.3082 30.0684C41.5426 30.0684 40.9547 29.8462 40.5445 29.4019C40.1344 28.9575 39.9293 28.3195 39.9293 27.4878C39.9293 26.6561 40.1344 26.0215 40.5445 25.584C40.957 25.1442 41.5471 24.9243 42.315 24.9243C43.0829 24.9243 43.6697 25.1453 44.0753 25.5874C44.4832 26.0295 44.6871 26.6652 44.6871 27.4946ZM41.0401 27.4946C41.0401 28.0529 41.1461 28.4733 41.358 28.7559C41.5699 29.0384 41.8867 29.1797 42.3082 29.1797C43.1536 29.1797 43.5763 28.618 43.5763 27.4946C43.5763 26.369 43.1559 25.8062 42.315 25.8062C41.8935 25.8062 41.5756 25.9486 41.3614 26.2334C41.1472 26.516 41.0401 26.9364 41.0401 27.4946ZM50.8559 30H49.5092L47.3354 26.2197H47.3046C47.3479 26.8874 47.3695 27.3636 47.3695 27.6484V30H46.4228V25.0029H47.7592L49.9296 28.7456H49.9535C49.9193 28.0962 49.9022 27.637 49.9022 27.3682V25.0029H50.8559V30ZM25.9847 40H24.638L22.4642 36.2197H22.4334C22.4767 36.8874 22.4983 37.3636 22.4983 37.6484V40H21.5516V35.0029H22.888L25.0584 38.7456H25.0823C25.0481 38.0962 25.0311 37.637 25.0311 37.3682V35.0029H25.9847V40ZM31.005 40L30.6427 38.8105H28.8209L28.4586 40H27.317L29.0807 34.9824H30.3761L32.1466 40H31.005ZM30.3897 37.9219C30.0548 36.8441 29.8657 36.2345 29.8224 36.0933C29.7813 35.952 29.7517 35.8403 29.7335 35.7583C29.6583 36.05 29.443 36.7712 29.0875 37.9219H30.3897ZM35.5946 40L34.3915 36.0796H34.3607C34.404 36.8771 34.4257 37.4092 34.4257 37.6758V40H33.4789V35.0029H34.9213L36.1039 38.8242H36.1244L37.3788 35.0029H38.8212V40H37.8334V37.6348C37.8334 37.5231 37.8345 37.3944 37.8368 37.2485C37.8414 37.1027 37.8573 36.7153 37.8847 36.0864H37.8539L36.5653 40H35.5946ZM43.6604 40H40.7824V35.0029H43.6604V35.8711H41.842V36.9683H43.5339V37.8364H41.842V39.125H43.6604V40Z" fill="#E85218"/>
              </svg>
            </v-flex>
            <v-flex xs8 align-self-center position-legend>
              {{ $vuetify.breakpoint.smAndDown ? 'Повышение ответственности и зарплаты' : 'Вертикальный переход — повышение ответственности и зарплаты' }}

            </v-flex>
            <v-flex shrink position-bubble align-self-center>
              <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32.5" cy="32.5" r="32" fill="white" stroke="#009954"/>
              <path d="M14.5003 27.3545H14.8489C15.1748 27.3545 15.4186 27.2907 15.5804 27.1631C15.7422 27.0332 15.823 26.8452 15.823 26.5991C15.823 26.3507 15.7547 26.1673 15.618 26.0488C15.4835 25.9303 15.2716 25.8711 14.9822 25.8711H14.5003V27.3545ZM16.8929 26.5615C16.8929 27.0993 16.7243 27.5106 16.387 27.7954C16.0521 28.0802 15.5747 28.2227 14.9549 28.2227H14.5003V30H13.4407V25.0029H15.0369C15.643 25.0029 16.1033 25.134 16.4178 25.396C16.7345 25.6558 16.8929 26.0443 16.8929 26.5615ZM23.0719 27.4946C23.0719 28.3218 22.8668 28.9575 22.4566 29.4019C22.0465 29.8462 21.4586 30.0684 20.693 30.0684C19.9273 30.0684 19.3395 29.8462 18.9293 29.4019C18.5191 28.9575 18.3141 28.3195 18.3141 27.4878C18.3141 26.6561 18.5191 26.0215 18.9293 25.584C19.3417 25.1442 19.9319 24.9243 20.6998 24.9243C21.4677 24.9243 22.0545 25.1453 22.4601 25.5874C22.8679 26.0295 23.0719 26.6652 23.0719 27.4946ZM19.4249 27.4946C19.4249 28.0529 19.5309 28.4733 19.7428 28.7559C19.9547 29.0384 20.2714 29.1797 20.693 29.1797C21.5383 29.1797 21.961 28.618 21.961 27.4946C21.961 26.369 21.5406 25.8062 20.6998 25.8062C20.2783 25.8062 19.9604 25.9486 19.7462 26.2334C19.532 26.516 19.4249 26.9364 19.4249 27.4946ZM27.7572 28.6123C27.7572 29.0635 27.5943 29.4189 27.2685 29.6787C26.9449 29.9385 26.4937 30.0684 25.9149 30.0684C25.3817 30.0684 24.9101 29.9681 24.4999 29.7676V28.7832C24.8371 28.9336 25.122 29.0396 25.3544 29.1011C25.5891 29.1626 25.8033 29.1934 25.997 29.1934C26.2294 29.1934 26.4071 29.1489 26.5302 29.0601C26.6555 28.9712 26.7182 28.839 26.7182 28.6636C26.7182 28.5656 26.6908 28.479 26.6361 28.4038C26.5814 28.3263 26.5006 28.2523 26.3935 28.1816C26.2886 28.111 26.0733 27.9982 25.7475 27.8433C25.4421 27.6997 25.2131 27.5618 25.0604 27.4297C24.9078 27.2975 24.7859 27.1437 24.6947 26.9683C24.6036 26.7928 24.558 26.5877 24.558 26.353C24.558 25.911 24.7073 25.5635 25.0058 25.3105C25.3065 25.0576 25.7213 24.9312 26.2499 24.9312C26.5097 24.9312 26.7569 24.9619 26.9916 25.0234C27.2286 25.085 27.4758 25.1715 27.7333 25.2832L27.3915 26.1069C27.1249 25.9976 26.9039 25.9212 26.7284 25.8779C26.5552 25.8346 26.3843 25.813 26.2157 25.813C26.0152 25.813 25.8614 25.8597 25.7543 25.9531C25.6472 26.0465 25.5937 26.1685 25.5937 26.3188C25.5937 26.4123 25.6153 26.4943 25.6586 26.5649C25.7019 26.6333 25.7702 26.7005 25.8637 26.7666C25.9594 26.8304 26.1838 26.9466 26.537 27.1152C27.0041 27.3385 27.3243 27.563 27.4975 27.7886C27.6706 28.0119 27.7572 28.2865 27.7572 28.6123ZM29.363 30V25.0029H30.4226V30H29.363ZM34.3081 30H33.2485V25.8848H31.8916V25.0029H35.665V25.8848H34.3081V30ZM37.1341 30V25.0029H38.1937V30H37.1341ZM44.6871 27.4946C44.6871 28.3218 44.482 28.9575 44.0719 29.4019C43.6617 29.8462 43.0738 30.0684 42.3082 30.0684C41.5426 30.0684 40.9547 29.8462 40.5445 29.4019C40.1344 28.9575 39.9293 28.3195 39.9293 27.4878C39.9293 26.6561 40.1344 26.0215 40.5445 25.584C40.957 25.1442 41.5471 24.9243 42.315 24.9243C43.0829 24.9243 43.6697 25.1453 44.0753 25.5874C44.4832 26.0295 44.6871 26.6652 44.6871 27.4946ZM41.0401 27.4946C41.0401 28.0529 41.1461 28.4733 41.358 28.7559C41.5699 29.0384 41.8867 29.1797 42.3082 29.1797C43.1536 29.1797 43.5763 28.618 43.5763 27.4946C43.5763 26.369 43.1559 25.8062 42.315 25.8062C41.8935 25.8062 41.5756 25.9486 41.3614 26.2334C41.1472 26.516 41.0401 26.9364 41.0401 27.4946ZM50.8559 30H49.5092L47.3354 26.2197H47.3046C47.3479 26.8874 47.3695 27.3636 47.3695 27.6484V30H46.4228V25.0029H47.7592L49.9296 28.7456H49.9535C49.9193 28.0962 49.9022 27.637 49.9022 27.3682V25.0029H50.8559V30ZM25.9847 40H24.638L22.4642 36.2197H22.4334C22.4767 36.8874 22.4983 37.3636 22.4983 37.6484V40H21.5516V35.0029H22.888L25.0584 38.7456H25.0823C25.0481 38.0962 25.0311 37.637 25.0311 37.3682V35.0029H25.9847V40ZM31.005 40L30.6427 38.8105H28.8209L28.4586 40H27.317L29.0807 34.9824H30.3761L32.1466 40H31.005ZM30.3897 37.9219C30.0548 36.8441 29.8657 36.2345 29.8224 36.0933C29.7813 35.952 29.7517 35.8403 29.7335 35.7583C29.6583 36.05 29.443 36.7712 29.0875 37.9219H30.3897ZM35.5946 40L34.3915 36.0796H34.3607C34.404 36.8771 34.4257 37.4092 34.4257 37.6758V40H33.4789V35.0029H34.9213L36.1039 38.8242H36.1244L37.3788 35.0029H38.8212V40H37.8334V37.6348C37.8334 37.5231 37.8345 37.3944 37.8368 37.2485C37.8414 37.1027 37.8573 36.7153 37.8847 36.0864H37.8539L36.5653 40H35.5946ZM43.6604 40H40.7824V35.0029H43.6604V35.8711H41.842V36.9683H43.5339V37.8364H41.842V39.125H43.6604V40Z" fill="#009954"/>
              </svg>
            </v-flex>
            <v-flex xs8 align-self-center position-legend>
              {{ $vuetify.breakpoint.smAndDown ? 'Изменение обязанностей, но аналогичный уровень ответственности и зарплаты' : 'Горизонтальный переход — изменение обязанностей, но аналогичный уровень ответственности и зарплаты' }}
            </v-flex>
            <v-flex shrink position-bubble>
              <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32.5" cy="32.5" r="32" fill="white" stroke="#00A7F2"/>
              <path d="M14.5003 27.3545H14.8489C15.1748 27.3545 15.4186 27.2907 15.5804 27.1631C15.7422 27.0332 15.823 26.8452 15.823 26.5991C15.823 26.3507 15.7547 26.1673 15.618 26.0488C15.4835 25.9303 15.2716 25.8711 14.9822 25.8711H14.5003V27.3545ZM16.8929 26.5615C16.8929 27.0993 16.7243 27.5106 16.387 27.7954C16.0521 28.0802 15.5747 28.2227 14.9549 28.2227H14.5003V30H13.4407V25.0029H15.0369C15.643 25.0029 16.1033 25.134 16.4178 25.396C16.7345 25.6558 16.8929 26.0443 16.8929 26.5615ZM23.0719 27.4946C23.0719 28.3218 22.8668 28.9575 22.4566 29.4019C22.0465 29.8462 21.4586 30.0684 20.693 30.0684C19.9273 30.0684 19.3395 29.8462 18.9293 29.4019C18.5191 28.9575 18.3141 28.3195 18.3141 27.4878C18.3141 26.6561 18.5191 26.0215 18.9293 25.584C19.3417 25.1442 19.9319 24.9243 20.6998 24.9243C21.4677 24.9243 22.0545 25.1453 22.4601 25.5874C22.8679 26.0295 23.0719 26.6652 23.0719 27.4946ZM19.4249 27.4946C19.4249 28.0529 19.5309 28.4733 19.7428 28.7559C19.9547 29.0384 20.2714 29.1797 20.693 29.1797C21.5383 29.1797 21.961 28.618 21.961 27.4946C21.961 26.369 21.5406 25.8062 20.6998 25.8062C20.2783 25.8062 19.9604 25.9486 19.7462 26.2334C19.532 26.516 19.4249 26.9364 19.4249 27.4946ZM27.7572 28.6123C27.7572 29.0635 27.5943 29.4189 27.2685 29.6787C26.9449 29.9385 26.4937 30.0684 25.9149 30.0684C25.3817 30.0684 24.9101 29.9681 24.4999 29.7676V28.7832C24.8371 28.9336 25.122 29.0396 25.3544 29.1011C25.5891 29.1626 25.8033 29.1934 25.997 29.1934C26.2294 29.1934 26.4071 29.1489 26.5302 29.0601C26.6555 28.9712 26.7182 28.839 26.7182 28.6636C26.7182 28.5656 26.6908 28.479 26.6361 28.4038C26.5814 28.3263 26.5006 28.2523 26.3935 28.1816C26.2886 28.111 26.0733 27.9982 25.7475 27.8433C25.4421 27.6997 25.2131 27.5618 25.0604 27.4297C24.9078 27.2975 24.7859 27.1437 24.6947 26.9683C24.6036 26.7928 24.558 26.5877 24.558 26.353C24.558 25.911 24.7073 25.5635 25.0058 25.3105C25.3065 25.0576 25.7213 24.9312 26.2499 24.9312C26.5097 24.9312 26.7569 24.9619 26.9916 25.0234C27.2286 25.085 27.4758 25.1715 27.7333 25.2832L27.3915 26.1069C27.1249 25.9976 26.9039 25.9212 26.7284 25.8779C26.5552 25.8346 26.3843 25.813 26.2157 25.813C26.0152 25.813 25.8614 25.8597 25.7543 25.9531C25.6472 26.0465 25.5937 26.1685 25.5937 26.3188C25.5937 26.4123 25.6153 26.4943 25.6586 26.5649C25.7019 26.6333 25.7702 26.7005 25.8637 26.7666C25.9594 26.8304 26.1838 26.9466 26.537 27.1152C27.0041 27.3385 27.3243 27.563 27.4975 27.7886C27.6706 28.0119 27.7572 28.2865 27.7572 28.6123ZM29.363 30V25.0029H30.4226V30H29.363ZM34.3081 30H33.2485V25.8848H31.8916V25.0029H35.665V25.8848H34.3081V30ZM37.1341 30V25.0029H38.1937V30H37.1341ZM44.6871 27.4946C44.6871 28.3218 44.482 28.9575 44.0719 29.4019C43.6617 29.8462 43.0738 30.0684 42.3082 30.0684C41.5426 30.0684 40.9547 29.8462 40.5445 29.4019C40.1344 28.9575 39.9293 28.3195 39.9293 27.4878C39.9293 26.6561 40.1344 26.0215 40.5445 25.584C40.957 25.1442 41.5471 24.9243 42.315 24.9243C43.0829 24.9243 43.6697 25.1453 44.0753 25.5874C44.4832 26.0295 44.6871 26.6652 44.6871 27.4946ZM41.0401 27.4946C41.0401 28.0529 41.1461 28.4733 41.358 28.7559C41.5699 29.0384 41.8867 29.1797 42.3082 29.1797C43.1536 29.1797 43.5763 28.618 43.5763 27.4946C43.5763 26.369 43.1559 25.8062 42.315 25.8062C41.8935 25.8062 41.5756 25.9486 41.3614 26.2334C41.1472 26.516 41.0401 26.9364 41.0401 27.4946ZM50.8559 30H49.5092L47.3354 26.2197H47.3046C47.3479 26.8874 47.3695 27.3636 47.3695 27.6484V30H46.4228V25.0029H47.7592L49.9296 28.7456H49.9535C49.9193 28.0962 49.9022 27.637 49.9022 27.3682V25.0029H50.8559V30ZM25.9847 40H24.638L22.4642 36.2197H22.4334C22.4767 36.8874 22.4983 37.3636 22.4983 37.6484V40H21.5516V35.0029H22.888L25.0584 38.7456H25.0823C25.0481 38.0962 25.0311 37.637 25.0311 37.3682V35.0029H25.9847V40ZM31.005 40L30.6427 38.8105H28.8209L28.4586 40H27.317L29.0807 34.9824H30.3761L32.1466 40H31.005ZM30.3897 37.9219C30.0548 36.8441 29.8657 36.2345 29.8224 36.0933C29.7813 35.952 29.7517 35.8403 29.7335 35.7583C29.6583 36.05 29.443 36.7712 29.0875 37.9219H30.3897ZM35.5946 40L34.3915 36.0796H34.3607C34.404 36.8771 34.4257 37.4092 34.4257 37.6758V40H33.4789V35.0029H34.9213L36.1039 38.8242H36.1244L37.3788 35.0029H38.8212V40H37.8334V37.6348C37.8334 37.5231 37.8345 37.3944 37.8368 37.2485C37.8414 37.1027 37.8573 36.7153 37.8847 36.0864H37.8539L36.5653 40H35.5946ZM43.6604 40H40.7824V35.0029H43.6604V35.8711H41.842V36.9683H43.5339V37.8364H41.842V39.125H43.6604V40Z" fill="#00A7F2"/>
              </svg>
            </v-flex>
            <v-flex xs8 align-self-center position-legend >
              До этой позиции можно дорасти с текущей позиции
            </v-flex>
            <v-flex shrink position-bubble align-self-center>
              <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32.5" cy="32.5" r="32" fill="#F9F9F9" stroke="#9D9D9D"/>
              <path d="M14.5003 27.3545H14.8489C15.1748 27.3545 15.4186 27.2907 15.5804 27.1631C15.7422 27.0332 15.823 26.8452 15.823 26.5991C15.823 26.3507 15.7547 26.1673 15.618 26.0488C15.4835 25.9303 15.2716 25.8711 14.9822 25.8711H14.5003V27.3545ZM16.8929 26.5615C16.8929 27.0993 16.7243 27.5106 16.387 27.7954C16.0521 28.0802 15.5747 28.2227 14.9549 28.2227H14.5003V30H13.4407V25.0029H15.0369C15.643 25.0029 16.1033 25.134 16.4178 25.396C16.7345 25.6558 16.8929 26.0443 16.8929 26.5615ZM23.0719 27.4946C23.0719 28.3218 22.8668 28.9575 22.4566 29.4019C22.0465 29.8462 21.4586 30.0684 20.693 30.0684C19.9273 30.0684 19.3395 29.8462 18.9293 29.4019C18.5191 28.9575 18.3141 28.3195 18.3141 27.4878C18.3141 26.6561 18.5191 26.0215 18.9293 25.584C19.3417 25.1442 19.9319 24.9243 20.6998 24.9243C21.4677 24.9243 22.0545 25.1453 22.4601 25.5874C22.8679 26.0295 23.0719 26.6652 23.0719 27.4946ZM19.4249 27.4946C19.4249 28.0529 19.5309 28.4733 19.7428 28.7559C19.9547 29.0384 20.2714 29.1797 20.693 29.1797C21.5383 29.1797 21.961 28.618 21.961 27.4946C21.961 26.369 21.5406 25.8062 20.6998 25.8062C20.2783 25.8062 19.9604 25.9486 19.7462 26.2334C19.532 26.516 19.4249 26.9364 19.4249 27.4946ZM27.7572 28.6123C27.7572 29.0635 27.5943 29.4189 27.2685 29.6787C26.9449 29.9385 26.4937 30.0684 25.9149 30.0684C25.3817 30.0684 24.9101 29.9681 24.4999 29.7676V28.7832C24.8371 28.9336 25.122 29.0396 25.3544 29.1011C25.5891 29.1626 25.8033 29.1934 25.997 29.1934C26.2294 29.1934 26.4071 29.1489 26.5302 29.0601C26.6555 28.9712 26.7182 28.839 26.7182 28.6636C26.7182 28.5656 26.6908 28.479 26.6361 28.4038C26.5814 28.3263 26.5006 28.2523 26.3935 28.1816C26.2886 28.111 26.0733 27.9982 25.7475 27.8433C25.4421 27.6997 25.2131 27.5618 25.0604 27.4297C24.9078 27.2975 24.7859 27.1437 24.6947 26.9683C24.6036 26.7928 24.558 26.5877 24.558 26.353C24.558 25.911 24.7073 25.5635 25.0058 25.3105C25.3065 25.0576 25.7213 24.9312 26.2499 24.9312C26.5097 24.9312 26.7569 24.9619 26.9916 25.0234C27.2286 25.085 27.4758 25.1715 27.7333 25.2832L27.3915 26.1069C27.1249 25.9976 26.9039 25.9212 26.7284 25.8779C26.5552 25.8346 26.3843 25.813 26.2157 25.813C26.0152 25.813 25.8614 25.8597 25.7543 25.9531C25.6472 26.0465 25.5937 26.1685 25.5937 26.3188C25.5937 26.4123 25.6153 26.4943 25.6586 26.5649C25.7019 26.6333 25.7702 26.7005 25.8637 26.7666C25.9594 26.8304 26.1838 26.9466 26.537 27.1152C27.0041 27.3385 27.3243 27.563 27.4975 27.7886C27.6706 28.0119 27.7572 28.2865 27.7572 28.6123ZM29.363 30V25.0029H30.4226V30H29.363ZM34.3081 30H33.2485V25.8848H31.8916V25.0029H35.665V25.8848H34.3081V30ZM37.1341 30V25.0029H38.1937V30H37.1341ZM44.6871 27.4946C44.6871 28.3218 44.482 28.9575 44.0719 29.4019C43.6617 29.8462 43.0738 30.0684 42.3082 30.0684C41.5426 30.0684 40.9547 29.8462 40.5445 29.4019C40.1344 28.9575 39.9293 28.3195 39.9293 27.4878C39.9293 26.6561 40.1344 26.0215 40.5445 25.584C40.957 25.1442 41.5471 24.9243 42.315 24.9243C43.0829 24.9243 43.6697 25.1453 44.0753 25.5874C44.4832 26.0295 44.6871 26.6652 44.6871 27.4946ZM41.0401 27.4946C41.0401 28.0529 41.1461 28.4733 41.358 28.7559C41.5699 29.0384 41.8867 29.1797 42.3082 29.1797C43.1536 29.1797 43.5763 28.618 43.5763 27.4946C43.5763 26.369 43.1559 25.8062 42.315 25.8062C41.8935 25.8062 41.5756 25.9486 41.3614 26.2334C41.1472 26.516 41.0401 26.9364 41.0401 27.4946ZM50.8559 30H49.5092L47.3354 26.2197H47.3046C47.3479 26.8874 47.3695 27.3636 47.3695 27.6484V30H46.4228V25.0029H47.7592L49.9296 28.7456H49.9535C49.9193 28.0962 49.9022 27.637 49.9022 27.3682V25.0029H50.8559V30ZM25.9847 40H24.638L22.4642 36.2197H22.4334C22.4767 36.8874 22.4983 37.3636 22.4983 37.6484V40H21.5516V35.0029H22.888L25.0584 38.7456H25.0823C25.0481 38.0962 25.0311 37.637 25.0311 37.3682V35.0029H25.9847V40ZM31.005 40L30.6427 38.8105H28.8209L28.4586 40H27.317L29.0807 34.9824H30.3761L32.1466 40H31.005ZM30.3897 37.9219C30.0548 36.8441 29.8657 36.2345 29.8224 36.0933C29.7813 35.952 29.7517 35.8403 29.7335 35.7583C29.6583 36.05 29.443 36.7712 29.0875 37.9219H30.3897ZM35.5946 40L34.3915 36.0796H34.3607C34.404 36.8771 34.4257 37.4092 34.4257 37.6758V40H33.4789V35.0029H34.9213L36.1039 38.8242H36.1244L37.3788 35.0029H38.8212V40H37.8334V37.6348C37.8334 37.5231 37.8345 37.3944 37.8368 37.2485C37.8414 37.1027 37.8573 36.7153 37.8847 36.0864H37.8539L36.5653 40H35.5946ZM43.6604 40H40.7824V35.0029H43.6604V35.8711H41.842V36.9683H43.5339V37.8364H41.842V39.125H43.6604V40Z" fill="#9D9D9D"/>
              </svg>
            </v-flex>
            <v-flex grow xs8 align-self-center position-legend>
              До этой позиции нельзя дорасти с текущей позиции
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 change-function-box>

        <CareerMapBetweenFunction @changeFunction='changeFunction'
                                :positionsToOnHover='positionsToAnotherFuncOnHover_get'
                                :positionsToOnSelect='positionsToInSmallMapOnSelect_get'
                      />
        </v-flex>
        </v-layout>
      </v-flex>




      <v-flex md3 xs12 style='margin-top: 50px'  map-box :class='{"fixed-box" :  $vuetify.breakpoint.smAndDown}' v-if='showMapsBetween'>
          <v-flex xs12 align-self-center>

          </v-flex>
      </v-flex>

      <v-btn fab dark
             class='hidden-sm-and-up filter-button'
             color="#00A7F2"
             fixed
             heigth='60'
             v-show='!showMapsBetween && !showInfo && !mapLegend'
             @click='refreshData({ destroy: true }), mapLegend = true'>
        <v-icon dark size='25'>cached</v-icon>
      </v-btn>
      <v-btn dark
             class='hidden-sm-and-up show-info-button button'
             height='60'
             color="#009954"
             fixed
             v-show='!showMapsBetween && !showInfo'
             v-if='positionSelectedInfo_get'
             @click='showInfo = true'>
        <div><p>Больше информации о {{ positionSelectedInfo_get.name }}</p></div>
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import CareerMapMain from './CareerMapMain.vue';
import CareerMapBetweenFunction from './CareerMapBetweenFunction.vue';
import CareerTrack from './CareerTrack.vue'
import { mapActions, mapGetters } from "vuex";
import JobCard from "./jobCard.vue";

export default {
  data() {
    return {
      functionId: '',
      position: '',
      mapLegend: true,
      infoShow: false,
      vacancyShow: false,
      showMapsBetween:  this.$vuetify.breakpoint.mdAndUp,
      showInfo: this.$vuetify.breakpoint.mdAndUp,
      infoShowDescription: this.$vuetify.breakpoint.mdAndUp,
      showTrack: false,
      onTrack: false,
    };
  },
  components: {
    CareerMapMain,
    CareerMapBetweenFunction,
    CareerTrack,
    JobCard,
  },
  methods: {
    ...mapActions('CareerMapNew',
    [
      'refreshPositionList',
      'refreshLevelList',
      'functionListUpdate',
      'refreshSubfunctionList',
      'refreshLinkList',
      'choseFunction',
      'mouseOverPosition',
      'mouseOutPosition',
      'selectedPosition',
      'backToPosition',
      'refreshData'
    ]),

    ...mapActions("VacancyCreator", ["vacancyListGetByIdList"]),
    ...mapActions("UserPage", ["showAttention"]),

    positionChosen(){
      const subfunction = this.subfunctionList_get.find(el => el.id === this.position.subfunction_id)
      this.functionId =  subfunction.function_id;
      this.choseFunction({ payload:{ functionId: subfunction.function_id, positionId: this.position.id} })
      this.functionChoosen = true;
    },

    changeFunction(positionId) {
      const position = this.positionList_get.find(el => el.id === positionId )
      console.log(position)
      const subfunction = this.subfunctionList_get.find(el => el.id === position.subfunction_id)
      this.functionId = subfunction.function_id;
      this.choseFunction({ payload:{ functionId: this.functionId, positionId }})
    },
    positionSelected(data) {
      this.selectedPosition(data)
      if (this.vacancyListDyId_get.length > 0) this.vacancyShow = true;
      else this.infoShow = true;
      this.mapLegend = false;
    },

    declOfNum(number, titles) {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    },

    showVacancies(){
      if (this.subscriptionStatus_get&&this.subscriptionOptions_get.some(el => el === 'vacanciesInMap')) {
        this.$router.push({name: "JobsFlow", params: { byId: true }})
      } else {
        this.showAttention({ payload: true })
        return;
      }
    },


  },
  computed: {
    ...mapGetters('CareerMapNew',
    [
      'radiusMain_get',
      'x0_get',
      'y0_get',
      'height_get',
      'width_get',
      'circleStroke_get',
      'levelList_get',
      'functionList_get',
      'subfunctionList_get',
      'filteredSubfunctionList_get',
      'circleLevelsInMap_get',
      'circleLinesInMap_get',
      'positionsInMap_get',
      'positionList_get',
      'linkList_get',
      'filteredLinksOnHover_get',
      'filteredPositionsUpOnHover_get',
      "filteredPositionsHorizHover_get",
      'filteredPositionsUpFutureHover_get',
      'filteredPositionsDisabledHover_get',
      'positionOnHover_get',
      'positionSelected_get',
      'filteredPositionsDisabledOnPosSelected_get',
      'filteredPositionsUpFutureOnPosSelected_get',
      'filteredPositionsHorizOnPosSelected_get',
      'filteredPositionsUpOnPosSelected_get',
      'linksArcOnHover_get',
      'historyLinks_get',
      'historyPositions_get',
      'subfunctionTitlesPath_get',
      'positionsNoDisplayOnHover_get',
      'positionsNoDisplay_get',
      'historyLinksTrue_get',

      'radiusForBetweenCircle_get',
      'heightForBetweenCircle_get',
      'widthForBetweenCircle_get',
      'positionsInSmallMap_get',
      'functionInSmallMap_get',
      'positionHoveredInSmallMap_get',
      'positionsInFunctionOnHover_get',
      'functionsOnHover_get',
      'positionsToInSmallMap_get',
      'linesToInSmallMap_get',
      'positionOnSelectInSmallMap_get',
      'positionsInFunctionOnSelect_get',
      'functionsOnSelect_get',

      'positionsToInSmallMapOnSelect_get',

      'heightForTrack_get',
      'widthForTrack_get',
      'positionsIntoTrack_get',
      'positionsIntoTrackToShow_get',

      'positionSelectedInfo_get',
      'positionsToAnotherFuncOnHover_get',
      'selectedFunction_get',

      'positionsNoDisplayBlurHover_get',
      'positionsNoDisplayBlurSelect_get'
    ]),

    ...mapGetters('VacancyCreator', ['vacancyListDyId_get']),

    ...mapGetters("UserPage", [
      'is_lockSidebar',
      'subscriptionStatus_get',
      'subscriptionOptions_get'
    ]),

    vacancyListThreeOnly() {
      return this.vacancyListDyId_get.slice(0, 2)
    },
    getMapHeight(){
      if (this.$vuetify.breakpoint.height < 900) {
        return { height : (this.$vuetify.breakpoint.height - 70) + 'px'};
      }

    }
  },
  props: [],
  mounted() {
    this.refreshPositionList();
    this.refreshLevelList();
    this.functionListUpdate();
    this.refreshSubfunctionList();
    this.refreshLinkList();
    window.addEventListener('touchmove',(e) => {
        if (this.showMapsBetween || this.showInfo || this.infoShowDescription || this.mapLegend) {
            e.preventDefault();
          }
    });
  },
  beforeDestroy(){
    this.refreshData({destroy: true});
    this.showAttention({ payload: false })
  },
};
</script>

<style>
  .change-function-box {
    margin-top: 30px;
  }

  .main-track-box {
    margin-bottom: 74px;
  }

  .positions-to .circle {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 9px
  }

  .positions-to .position-box {
    margin-bottom: 10px;
    cursor: pointer;
  }

  .positions-to .track-title {
    margin-bottom: 14px;
  }

  .track-box .track-title {
    margin-bottom: 20px;
  }

  .positions-to .circle.up {
    border: 1px dotted #E85218;
  }

  .positions-to .circle.horiz {
    border: 1px dotted #009954;
  }

  .positions-to .function-title {
    font-size: 10px;
    line-height: 14px;
    text-transform: capitalize;
  }

  .positions-to .position-title {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase
  }

  .positions-to .position-title.up {
    color: #E85218
  }

  .positions-to .position-title.horiz {
    color: #009954
  }

  .function-bubble {
    width: 120px;
    height: 120px;
    background: #FFFFFF;
    border: 1px solid #009654;
    margin: auto;
    padding: 0 10px 0 10px;
    border-radius: 50%;
    font-weight: bold;
    font-size: 14px;
    line-height: 19px;
    color: #009654;
    display: table;
    cursor: pointer;
  }


  .function-bubble p {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    text-transform: uppercase;
  }

  .function-bubble:hover {
    background: #009654;
    color: #FFFFFF;
  }
  .refresh-button {
    color: #9D9D9D;
  }
  .refresh-box:hover .refresh-button {
    color: #00A7F2;
  }
  .refresh-box:active .refresh-button {
    color: #009654;
  }

  .refresh-box {
    position: relative;
  }

  .refresh-box .refresh-text {
    position: absolute;
    left: 25px;
    top: 5px;
    min-width: 100px;
    display: none;

    font-size: 12px;
    line-height: 14px;
    font-weight: 300;
  }

  .refresh-box:hover .refresh-text {
    color: #00A7F2;
    display: block;
  }

  .refresh-box:active  .refresh-text {
    color: #009654;
    display: block;
  }

  .bubble-box {
    margin-right: 30px;
    margin-bottom: 30px;
  }

  .container-map {
    position: fixed;
  }

  .outer-container-map {
    overflow: hidden;
  }

  .outer-container-map .inner-container-map {
    height: 100%;
    margin-right: -50px;
    padding-right: 50px;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  @media only screen and (max-width: 600px) {
    .function-chose-title {
      font-size: 24px;
      line-height: 44px;
      margin-bottom: 50px;
    }

    .function-chose-bubles .function-bubble {
      margin-bottom: 50px;
    }

    .map-titles .function {
      font-size: 24px;
      line-height: 44px;
      margin-bottom: 25px;
    }

    .show-map-between-box .button.outlined {
      color: #E85218;
      border-color: #E85218;
    }

    .fixed-box {
      position: fixed;
      z-index: 10;
      bottom: 0;
      padding: 40px 62px 20px 63px;
      background-color: #ffffff;
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
      border-radius: 3px 0px;
    }

    .fixed-box.map-box {
      padding: 40px 0 20px 0;
      width: 100%;
      text-align: center;
    }

    .fixed-box.info-box {
      text-align: left;
    }

    .fixed-box .start-text {
      font-size: 18px;
      line-height: 29px;
      color: #000000;
      font-weight: 500;
      margin: 0;
      margin-bottom: 49px;
    }

    .position-bubble {
      margin: 0;
    }

    .position-bubble, .position-legend {
      margin-bottom: 25px;
    }

    .position {
      font-weight: 600;
      font-size: 28px;
      line-height: 38px;
      color: #009954;
      text-transform: uppercase;
      margin-bottom: 50px;
    }

    .show-info-button {
      bottom: 125px;
      left: 31px;
      width: 250px;
    }

    .career-map .filter-button {
      width: 60px;
      height: 60px;
    }
    .editor-switch {
      margin: 0;
      margin-bottom: 30px;
    }
    .editor-switch .button {
      width: 50%;
    }


    .carrer-map-main {
      margin-bottom: 150px;
    }

    .show-info-button div {
      display: table;
      width: 100%;
      height: 100%;
    }

    .show-info-button div  p {
      display: table-cell;
      text-align: center;
      vertical-align: middle;
    }

    .show-info-button .v-btn__content {
      white-space: normal;
    }
  }

</style>
