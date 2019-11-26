import adapterApi from './adapterApi';

const state = {
  radius: 300,
  x0: 360,
  y0: 360,
  height: 720,
  width: 720,
  raduisForBetweenCircle: 75,
  heightForBetweenCircle: 273,
  widthForBetweenCircle: 360,
  x0ForBetweenCircle: 119,
  y0ForBetweenCircle: 150,
  heightForTrack: 27,
  widthForTrack: 224,
  circleStroke: '#EFEFEF',
  positionList: [],
  subfunctionList: [],
  functionList: [],
  levelList: [],
  linkList: [],
  industryList: [],

  filteredSubfunctionList: [],
  filteredPositionList: [],
  positionsInMap: [],
  filteredLinksOnHover:[],
  filteredPositionsUpOnHover: [],
  filteredPositionsHorizHover: [],
  filteredPositionsUpFutureHover: new Set(),
  filteredPositionsDisabledHover: [],
  positionOnHover: null,
  filteredLinksOnPosSelected: [],
  filteredPositionsUpOnPosSelected: [],
  filteredPositionsHorizOnPosSelected: [],
  filteredPositionsUpFutureOnPosSelected: new Set(),
  positionSelected: null,
  filteredPositionsDisabledOnPosSelected: [],
  linksArcOnHover: [],
  linkLinesOnHover: [],
  historyPositions: [],
  historyLinks: [],
  subfunctionTitlesPath: [],
  positionsNoDisplayOnHover: [],
  positionsNoDisplay: [],
  positionsIntoTrack: null,
  positionsIntoTrackHistory: [],
  positionsInSmallMap: [],
  functionInSmallMap: null,
  positionHoveredInSmallMap: null,
  positionsInFunctionOnHover: [],
  functionsOnHover: [],
  positionsToInSmallMap: [],
  linesToInSmallMap: [],
  positionOnSelectInSmallMap: null,
  positionsInFunctionOnSelect: [],
  functionsOnSelect: [],
  positionsToInSmallMapOnSelect: [],
  linesToInSmallMapOnSelect: [],

  positionSelectedInfo: null,
  linkListByPositionFrom:[],
  angle: 0,
  selectedFunction: null,

  filteredPositionsDownSelect: [],
  filteredPositionsDownHover: [],
  industryList: [],
};


// getters
const getters = {
    radiusMain_get: state => {
      return state.radius
    },
    x0_get: state => {
      return state.x0
    },
    y0_get: state => {
      return state.y0
    },
    height_get: state => {
    return state.height;
    },
    width_get: state => {
      return state.width
    },
    radiusForBetweenCircle_get: state => {
      return state.raduisForBetweenCircle
    },
    x0ForBetweenCircle_get: state => {
      return state.x0ForBetweenCircle
    },
    y0ForBetweenCircle_get: state => {
      return state.y0ForBetweenCircle
    },
    heightForBetweenCircle_get: state => {
    return state.heightForBetweenCircle;
    },
    widthForBetweenCircle_get: state => {
      return state.widthForBetweenCircle
    },
    heightForTrack_get: state => {
    return (state.heightForTrack + ((state.historyPositions.length - 1) * 50));
    },
    widthForTrack_get: state => {
      return state.widthForTrack
    },
    circleStroke_get: state => {
      return state.circleStroke
    },
    positionList_get: state => {
        return state.positionList
    },
    positionById_get: state => id => {
        return state.positionList.find(x => x.id === id);
    },
    subfunctionList_get: state => {
        return state.subfunctionList
    },
    functionList_get: state => {
        return state.functionList
    },
    levelList_get: state => {
        return state.levelList
    },
    levelListAmount_get: state => {
        return state.levelList.length;
    },
    linkList_get: state => {
        return state.linkList
    },
    linkListByPositionFrom_get: state => {
        return state.linkListByPositionFrom;
    },
    industryList_get: state => {
      return state.industryList
    },

    filteredSubfunctionList_get: state => {
      return state.filteredSubfunctionList;
    },

    filteredPositionList_get: state => {
      return state.filteredPositionList;
    },

    circleLevelsInMap_get: state => {
      const radiusPerCircle = state.radius / (state.levelList.length - 1);
      const circles = []
      state.levelList.forEach( (el, index) => {
        circles.push({
          cx: state.x0,
          cy: state.y0,
          stroke: state.circleStroke,
          r: el.index === 6 ? 0 : 0 + radiusPerCircle * ( state.levelList.length - el.index ),
          id: el.id
        })
      })

      return circles;
    },

    circleLinesInMap_get: state => {
      const raduisLines= [];
      for (let i = 0; i < 20; i++) {
        let radians = (360 / 20 * i) * Math.PI / 180;
        raduisLines.push({
          x2: state.x0 - state.radius * Math.cos(radians),
          y2: state.y0 - state.radius * Math.sin(radians),
          x1: state.x0,
          y1: state.y0,
          stroke: state.circleStroke,
        })

      }

      return raduisLines;
    },

    positionsInMap_get: state => {
      return state.positionsInMap;
    },

    filteredLinksOnHover_get: state => {
      return state.filteredLinksOnHover;
    },

    filteredPositionsUpOnHover_get: state => {
      return state.filteredPositionsUpOnHover;
    },

    filteredPositionsHorizHover_get: state => {
      return state.filteredPositionsHorizHover;
    },

    filteredPositionsUpFutureHover_get: state => {
      return state.filteredPositionsUpFutureHover;
    },

    filteredPositionsDisabledHover_get: state => {
      return state.filteredPositionsDisabledHover;
    },

    positionOnHover_get: state => {
      return state.positionOnHover;
    },

    filteredLinksOnPosSelected_get: state => {
      return state.filteredLinksOnPosSelected;
    },

    filteredPositionsUpOnPosSelected_get: state => {
      return state.filteredPositionsUpOnPosSelected;
    },

    filteredPositionsHorizOnPosSelected_get: state => {
      return state.filteredPositionsHorizOnPosSelected;
    },

    filteredPositionsUpFutureOnPosSelected_get: state => {
      return state.filteredPositionsUpFutureOnPosSelected;
    },

    positionSelected_get: state => {
      return state.positionSelected;
    },

    filteredPositionsDisabledOnPosSelected_get: state => {
      return state.filteredPositionsDisabledOnPosSelected;
    },

    linksArcOnHover_get: state => {
      return state.linksArcOnHover;
    },

    historyPositions_get: state => {
      return state.historyPositions;
    },

    historyLinksTrue_get: state => {
      return state.historyLinks;
    },

    historyLinks_get: state => {
      return state.historyLinks.filter(el => el.function_id === state.selectedFunction.id);
    },

    subfunctionTitlesPath_get: state => {
      return state.subfunctionTitlesPath;
    },

    positionsNoDisplayOnHover_get: state => {

      return state.positionsNoDisplayOnHover.filter(el => {
        if (state.filteredPositionsHorizHover.some(pos => pos.id === el.id)||state.filteredPositionsUpOnHover.some(pos => pos.id === el.id)) return;
        else return el;
      });
    },

    positionsNoDisplay_get: state => {
      return state.positionsNoDisplay.filter(el => {
        if (state.filteredPositionsHorizOnPosSelected.some(pos => pos.id === el.id)||state.filteredPositionsUpOnPosSelected.some(pos => pos.id === el.id)) return;
        else if (state.historyPositions.some(pos => pos.id === el.id)) return;
        return el;
      });
    },

    positionsNoDisplayBlurHover_get: state => {
      return state.positionsNoDisplayOnHover.filter(el => {
        if (state.filteredPositionsHorizHover.some(pos => pos.id === el.id)||state.filteredPositionsUpOnHover.some(pos => pos.id === el.id)) return el;
        else return;
      });
    },

    positionsNoDisplayBlurSelect_get: state => {
      return state.positionsNoDisplay.filter(el => {
        if (state.filteredPositionsHorizOnPosSelected.some(pos => pos.id === el.id)||state.filteredPositionsUpOnPosSelected.some(pos => pos.id === el.id)) return el;
        else if (state.historyPositions.some(pos => pos.id === el.id)) return el;
        else return;
      });
    },

    positionsIntoTrack_get: state => {
      return state.positionsIntoTrack;
    },

    positionsIntoTrackHistory_get: state => {
      return state.positionsIntoTrackHistory
    },

    positionsIntoTrackToShow_get: state => {
      const newList = [];
      state.positionsIntoTrackHistory.forEach(el => {
        newList.push(el)
      })
      if (state.positionsIntoTrack) newList.push(state.positionsIntoTrack)
      return newList;
    },

    positionsInSmallMap_get: state => {
      return state.positionsInSmallMap
    },

    functionInSmallMap_get: state => {
      return state.functionInSmallMap;
    },

    positionHoveredInSmallMap_get: state => {
      return state.positionHoveredInSmallMap;
    },

    positionsInFunctionOnHover_get: state => {
      return state.positionsInFunctionOnHover;
    },

    functionsOnHover_get: state => {
      return state.functionsOnHover;
    },

    positionsToInSmallMap_get: state => {
      return state.positionsToInSmallMap;
    },

    linesToInSmallMap_get: state => {
      return state.linesToInSmallMap;
    },


    positionOnSelectInSmallMap_get: state => {
      return state.positionOnSelectInSmallMap;
    },

    positionsInFunctionOnSelect_get: state => {
      return state.positionsInFunctionOnSelect;
    },

    functionsOnSelect_get: state => {
      return state.functionsOnSelect;
    },

    positionsToInSmallMapOnSelect_get: state => {
      return state.positionsToInSmallMapOnSelect;
    },

    linesToInSmallMapOnSelect_get: state => {
      return state.linesToInSmallMapOnSelect;
    },

    positionSelectedInfo_get: state => {
      return state.positionSelectedInfo;
    },

    positionsToAnotherFuncOnHover_get: state => {
      if (!state.positionOnHover) return [];
      const positionsInSmallMap = state.positionList.filter(pos => {
        if (state.historyPositions.find(el => el.id === pos.id)) return;
        if (state.filteredLinksOnHover.find(link => link.position_to === pos.id)) {
          if (!state.filteredSubfunctionList.find(subf => subf.id === pos.subfunction_id)) return pos;
        }
      })

      return positionsInSmallMap.map(el => {
        const type = state.levelList.find(level => level.id === el.level_id).index > state.levelList.find(level => level.id === state.positionOnHover.level_id).index ? 'up' : 'horiz'
        return {
          name:  el.name,
          id: el.id,
          subfunction: state.subfunctionList.find(sub => sub.id === el.subfunction_id).name,
          function: state.functionList.find(func => func.subfunctionList.find(elem => elem.id === el.subfunction_id)).name,
          type,
        }
      }).sort((a, b) => {
        if (a.type === 'up') {
          return -1
        }
        if (a.type === 'horiz'){
          return 1
        }
      })
    },
    selectedFunction_get: state => {
      return state.selectedFunction;
    },

    filteredPositionsDownSelect_get: state => {
      return state.filteredPositionsDownSelect;
    },

    filteredPositionsDownHover_get: state => {
      return state.filteredPositionsDownHover;
    },

    industryList_get: state => {
      return state.industryList;
    },

}

// mutations
const mutations = {
    positionList_set(state, { payload }) {
        state.positionList = payload;
    },
    subfunctionList_set(state, { payload }) {
        state.subfunctionList = payload;
    },
    functionList_set(state, { payload }) {
        state.functionList = payload;
    },

    levelList_set(state, { payload }) {
        state.levelList = payload;
    },
    linkList_set(state, { payload }) {
        state.linkList = payload;
    },
    linkListByPositionFrom_set(state, { payload }) {
        state.linkListByPositionFrom = payload;
    },
    industryList_set(state, { payload }){
      state.industryList = payload;
    },

    filteredSubfunction_set(state, { payload }){
      state.filteredSubfunctionList = payload;
    },

    filteredPosition_set(state, { payload }){
      state.filteredPositionList = payload;
    },

    positionsInMap_set(state, { payload }){
      state.positionsInMap = payload;
    },

    filteredLinksOnHover_set(state, { payload }){
      state.filteredLinksOnHover = payload;
    },

    filteredPositionsUpOnHover_set(state, { payload }){
      state.filteredPositionsUpOnHover = payload;
    },

    filteredPositionsHorizHover_set(state, { payload }){
      state.filteredPositionsHorizHover = payload;
    },

    filteredPositionsUpFutureHover_set(state, { payload }){
      state.filteredPositionsUpFutureHover = payload;
    },

    filteredPositionsDisabledHover_set(state, { payload }){
      state.filteredPositionsDisabledHover = payload;
    },

    positionOnHover_set(state, { payload }){
      state.positionOnHover = payload;
    },

    filteredLinksOnPosSelected_set(state, { payload }){
      state.filteredLinksOnPosSelected = payload;
    },

    filteredPositionsUpOnPosSelected_set(state, { payload }){
      state.filteredPositionsUpOnPosSelected = payload;
    },

    filteredPositionsHorizOnPosSelected_set(state, { payload }){
      state.filteredPositionsHorizOnPosSelected = payload;
    },

    filteredPositionsUpFutureOnPosSelected_set(state, { payload }){
      state.filteredPositionsUpFutureOnPosSelected = payload;
    },

    filteredPositionsDisabledOnPosSelected_set(state, { payload }){
      state.filteredPositionsDisabledOnPosSelected = payload;
    },

    positionSelected_set(state, { payload }){
      state.positionSelected = payload;
    },

    linksArcOnHover_set(state, { payload }){
      state.linksArcOnHover = payload;
    },

    historyPositions_set(state, { payload }) {
      state.historyPositions = payload;
    },

    historyLinks_set(state, { payload }) {
      state.historyLinks = payload;
    },

    subfunctionTitlesPath_set(state, { payload }) {
      state.subfunctionTitlesPath = payload;
    },

    positionsNoDisplayOnHover_set(state, { payload }) {
      state.positionsNoDisplayOnHover = payload;
    },

    positionsNoDisplay_set(state, { payload }) {
      state.positionsNoDisplay = payload;
    },

    positionsIntoTrack_set(state, {payload}) {
      state.positionsIntoTrack = payload;
    },

    positionsIntoTrackHistory_set(state, {payload}) {
      state.positionsIntoTrackHistory = payload;
    },

    positionsInSmallMap_set(state, {payload}) {
      state.positionsInSmallMap = payload;
    },

    functionInSmallMap_set(state, {payload}) {
      state.functionInSmallMap = payload;
    },

    positionSelectedInSmallMap_set(state, {payload}) {
      state.positionSelectedInSmallMap = payload;
    },

    positionHoveredInSmallMap_set(state, {payload}) {
      state.positionHoveredInSmallMap = payload;
    },

    positionsInFunctionOnHover_set(state, {payload}) {
      state.positionsInFunctionOnHover = payload;
    },

    functionsOnHover_set(state, {payload}) {
      state.functionsOnHover = payload;
    },

    positionsToInSmallMap_set(state, {payload}) {
      state.positionsToInSmallMap = payload;
    },

    linesToInSmallMap_set(state, {payload}) {
      state.linesToInSmallMap = payload;
    },



    positionOnSelectInSmallMap_set(state, {payload}) {
      state.positionOnSelectInSmallMap = payload;
    },

    positionsInFunctionOnSelect_set(state, {payload}) {
      state.positionsInFunctionOnSelect = payload;
    },

    functionsOnSelect_set(state, {payload}) {
      state.functionsOnSelect = payload;
    },

    positionsToInSmallMapOnSelect_set(state, {payload}) {
      state.positionsToInSmallMapOnSelect = payload;
    },

    linesToInSmallMapOnSelect_set(state, {payload}) {
      state.linesToInSmallMapOnSelect = payload;
    },

    positionSelectedInfo_set(state, {payload}) {
      state.positionSelectedInfo = payload
    },

    selectedFunction_set(state, {payload}) {
      state.selectedFunction = payload
    },

    filteredPositionsDownHover_set(state, {payload}) {
      state.filteredPositionsDownHover = payload
    },

    filteredPositionsDownSelect_set(state, {payload}) {
      state.filteredPositionsDownSelect = payload
    },

    industryList_set(state, {payload}) {
      state.industryList = payload
    },

}

// actions
const actions = {
    functionListUpdate: async function ({ state, commit, dispatch, getters, rootGetters }) {
        const functionList = await adapterApi.readAllFunctionAvaible();

        commit('functionList_set', { payload: functionList });
    },

    positionsUpdateByFunction: async function ({ state, commit, dispatch, getters, rootGetters }, { payload }) {
        const { functionName } = payload;

        commit('positionList_set', { payload: positionList });
        commit('subfunctionList_set', { payload: subfunctionList });
    },

    refreshPositionList: async function ({ state, commit, dispatch, getters, rootGetters }) {
        let list = await adapterApi.objectListGet({ title: 'position' });
        if (list) {
            commit('positionList_set', { payload: list });
        };
        return true;
    },

    refreshLevelList: async function ({ state, commit, dispatch, getters, rootGetters }) {
        let list = await adapterApi.objectListGet({ title: 'level' });
        if (list) {
            commit('levelList_set', { payload: list });
        };
        return true;

    },

    refreshSubfunctionList: async function ({ state, commit, dispatch, getters, rootGetters }) {
        let list = await adapterApi.objectListGet({ title: 'subfunction' });
        if (list) {
            commit('subfunctionList_set', { payload: list });
        };
        return true;
    },

    refreshLinkList: async function ({ state, commit, dispatch, getters, rootGetters }) {
        let list = await adapterApi.objectListGet({ title: 'link' });
        if (list) {
            commit('linkList_set', { payload: list });
        };
        return true;
    },

    refreshIndustryList: async function ({ state, commit, dispatch, getters, rootGetters }) {
        let list = await adapterApi.objectListGet({ title: 'industry' });
        if (list) {
            commit('industryList_set', { payload: list });
        };
        return true;
    },

    choseFunction: async function ({ state, commit, dispatch, getters, rootGetters }, { payload }) {
      const { functionId, positionId, noRefresh } = payload;
      if (!noRefresh) await dispatch('refreshData', { destroy: false })
      console.log(functionId, positionId)
      const filteredSubfunction = getters.subfunctionList_get.filter( el => el.function_id === functionId);

      commit('selectedFunction_set', { payload: getters.functionList_get.find(el => el.id === functionId) });

      commit('filteredSubfunction_set', { payload: filteredSubfunction });

      const positions = [];
      const subfunctionTitles = [];
      const subfunctionTitlesPath = [];

      filteredSubfunction.forEach( async (el, index) => {
        let radians = ((360 / filteredSubfunction.length * index) + 90) * Math.PI / 180;
        const filteredPositions = getters.positionList_get.filter(elP => elP.subfunction_id === el.id);

        const positionStart = {
          x: state.x0 - (state.radius + 65) * Math.cos(radians-(18* Math.PI / 180)),
          y: state.x0 - (state.radius + 65) * Math.sin(radians-(18* Math.PI / 180))
        }
        const positionEnd = {
          x: state.x0 - (state.radius + 65) * Math.cos(radians+(18* Math.PI / 180)),
          y: state.x0 - (state.radius + 65) * Math.sin(radians+(18* Math.PI / 180))
        }
        if (Math.ceil(positionStart.x) > Math.ceil(positionEnd.x)) {
          subfunctionTitlesPath.push({
            d: `M ${positionEnd.x} ${positionEnd.y} A 0 0 0 0 0 ${positionStart.x} ${positionStart.y}`,
            title: el.name
          })
        } else {
          subfunctionTitlesPath.push({
            d: `M ${positionStart.x} ${positionStart.y} A 0 0 0 0 0 ${positionEnd.x} ${positionEnd.y}`,
            title: el.name
          })
        }
        if (el.branchList.length > 0) {
          radians = radians - ((18 * (Math.floor(el.branchList.length / 2))) * Math.PI / 180);
          el.branchList.forEach((branch, indexSmall) => {

              const filteredPositionsByBranch = filteredPositions.filter(pos => pos.branch_id === branch.id);
              const radiansPerBranch = radians + ((18 * indexSmall) * Math.PI / 180)
              filteredPositionsByBranch.forEach(pos => {
                const levelRaduis = getters.circleLevelsInMap_get.find( elLevel => {
                  if (elLevel.id === pos.level_id) {
                    return elLevel
                  }
                })
              positions.push({
                cx: getters.x0_get - levelRaduis.r * Math.cos(radiansPerBranch),
                cy: getters.y0_get - levelRaduis.r * Math.sin(radiansPerBranch),
                r: 32.5,
                title: pos.name,
                id: pos.id,
                level_id: pos.level_id,
                radians: radiansPerBranch,
                subfunction_id: pos.subfunction_id,
                function_id: getters.selectedFunction_get.id,
              })
            })
          })
        } else {
          filteredPositions.forEach( elPos => {
            const levelRaduis = getters.circleLevelsInMap_get.find( elLevel => {
              if (elLevel.id === elPos.level_id) {
                return elLevel
              }
            })
            positions.push({
              cx: getters.x0_get - levelRaduis.r * Math.cos(radians),
              cy: getters.y0_get - levelRaduis.r * Math.sin(radians),
              r: 32.5,
              title: elPos.name,
              id: elPos.id,
              level_id: elPos.level_id,
              radians: radians,
              subfunction_id: elPos.subfunction_id,
              function_id: getters.selectedFunction_get.id,
            })
          })
        }
      })

      commit("subfunctionTitlesPath_set", { payload: subfunctionTitlesPath });

      commit("positionsInMap_set", { payload: positions });


      if (positionId) {
      const position = positions.find(el => el.id === positionId);
        await dispatch('mouseOverPosition', { payload: { position, backToPosition: true } })
        await dispatch('selectedPosition', { payload: { position, backToPosition: true } })
        dispatch('mouseOutPosition')
      }
    },

    mouseOverPosition: async function({ state, commit, dispatch, getters, rootGetters }, { payload }) {
      const { position, backToPosition } = payload;
      if (!backToPosition) if (getters.filteredPositionsDisabledOnPosSelected_get.find(el => el.id === position.id)) return;
      if (getters.positionSelected_get){
        if (getters.positionSelected_get.id === position.id) return
      };
      if (getters.filteredPositionsUpFutureOnPosSelected_get.size > 0 ) {
        if (getters.filteredPositionsUpFutureOnPosSelected_get.has(position)) return;
      }
      commit('positionOnHover_set', { payload: position });
      const filteredLinks = getters.linkList_get.filter(el => el.position_from === position.id);
      commit('filteredLinksOnHover_set', { payload: filteredLinks });

      const filteredPositionsUp = [];
      const filteredPositionsHoriz = [];
      const filteredMiddlePositions = [];
      const filteredPositionsUpFuture = new Set();

      getters.positionsInMap_get.forEach( el => {
        if (el.id === position.id) return;
        const linkTo = filteredLinks.find(elLink => elLink.position_to === el.id);
        if (linkTo) {
          if (linkTo.type === 'up_directly'||linkTo.type === 'up_subfunction') {
            filteredPositionsUp.push(el);
          } else if (linkTo.type === 'horiz_one'||linkTo.type === 'horiz_both'||linkTo.type === 'down') {
            filteredPositionsHoriz.push(el);
          }
        }
        else filteredMiddlePositions.push(el)
      })


      filteredPositionsUp.forEach(el=> {
        const linksFrom = getters.linkList_get.filter(elLink => elLink.position_from === el.id);
        filteredMiddlePositions.forEach(elPos => {
          if (linksFrom.find(elLink => elLink.position_to === elPos.id)) {
            filteredPositionsUpFuture.add(elPos)
          }
        })
      })

      filteredPositionsHoriz.forEach(el=> {
        const linksFrom = getters.linkList_get.filter(elLink => elLink.position_from === el.id);
        filteredMiddlePositions.forEach(elPos => {
          if (linksFrom.find(elLink => elLink.position_to === elPos.id)) {
            filteredPositionsUpFuture.add(elPos)
          }
        })
      })


        for (let item of filteredPositionsUpFuture) {
          const index = filteredMiddlePositions.findIndex(el => el.id === item.id)
          if (index > -1) {
            filteredMiddlePositions.splice(index, 1)
          }
          const linksFrom = getters.linkList_get.filter(elLink => elLink.position_from === item.id);
          filteredMiddlePositions.forEach(elPos => {
            if (linksFrom.find(elLink => elLink.position_to === elPos.id)) {
              filteredPositionsUpFuture.add(elPos)
            }
          })
        }



      const filteredPositionsDisabled = filteredMiddlePositions;
      commit('filteredPositionsUpOnHover_set', { payload: filteredPositionsUp });
      commit('filteredPositionsHorizHover_set', { payload: filteredPositionsHoriz });
      commit('filteredPositionsUpFutureHover_set', { payload: filteredPositionsUpFuture });
      commit('filteredPositionsDisabledHover_set', { payload: filteredPositionsDisabled });

      if (getters.positionSelected_get&&getters.positionSelected_get.function_id === getters.selectedFunction_get.id) {
          const paths = [],
                noDisplayPositions = [];
          let raduis = null,
              type = null;
          const startAngle = getters.positionSelected_get.radians * 180 / Math.PI;
          const endAngle = position.radians * 180 / Math.PI;
          let differ = startAngle - endAngle;
          let sweepflag;
          if (differ < 0) {
            differ = differ * -1;
            sweepflag = differ > 180 ? 0 : 1;
          } else {
            sweepflag = differ < 180 ? 0 : 1;
          };
          if (getters.positionSelected_get.level_id === position.level_id ) {
            getters.positionsInMap_get.forEach(el => {
              /*if (position.radians > getters.positionSelected_get.radians && sweepflag === 0) {
                if (el.radians < getters.positionSelected_get.radians || el.radians > position.radians) {
                  if (el.level_id === getters.positionSelected_get.level_id) {
                    noDisplayPositions.push(el)
                  }
                }
              } else if (position.radians < getters.positionSelected_get.radians && sweepflag === 0) {
                if (el.radians > getters.positionSelected_get.radians || el.radians < position.radians) {
                  if (el.level_id === getters.positionSelected_get.level_id) {
                    noDisplayPositions.push(el)
                  }
                }
              } else */if (position.radians === 0 && getters.positionSelected_get.radians >= 3.14159) {
                if (el.radians > getters.positionSelected_get.radians) {
                  if (el.level_id === getters.positionSelected_get.level_id) {
                    el.on = position.id
                    noDisplayPositions.push(el)
                  }
                }
              } else if (getters.positionSelected_get.radians === 0 && position.radians >= 3.14159) {
                if (el.radians > position.radians) {
                  if (el.level_id === getters.positionSelected_get.level_id) {
                    el.on = position.id
                    noDisplayPositions.push(el)
                  }
                }
              } else if (getters.positionSelected_get.radians < position.radians) {
                if (position.radians - getters.positionSelected_get.radians > 3.3) {
                  if (el.radians > position.radians || el.radians < getters.positionSelected_get.radians) {
                    if (el.level_id === getters.positionSelected_get.level_id) {
                      el.on = position.id
                      noDisplayPositions.push(el)
                    }
                  }
                } else if (el.radians > getters.positionSelected_get.radians && el.radians < position.radians) {
                  if (el.level_id === getters.positionSelected_get.level_id) {
                    el.on = position.id
                    noDisplayPositions.push(el)
                  }
                }
              } else if (getters.positionSelected_get.radians > position.radians){
                if (sweepflag === 1) {
                  if (el.radians < getters.positionSelected_get.radians && el.radians < position.radians) {
                    if (el.level_id === getters.positionSelected_get.level_id) {
                      el.on = position.id
                      noDisplayPositions.push(el)
                    }
                  } else if (el.radians > getters.positionSelected_get.radians && el.radians > position.radians) {
                    if (el.level_id === getters.positionSelected_get.level_id) {

                      el.on = position.id
                      noDisplayPositions.push(el)
                    }
                  }
                } else if (el.radians < getters.positionSelected_get.radians && el.radians > position.radians) {
                  if (el.level_id === getters.positionSelected_get.level_id) {
                    el.on = position.id
                    noDisplayPositions.push(el)
                  }
                }
              }
            })
            raduis = getters.circleLevelsInMap_get.find(el => el.id === position.level_id);
            paths.push({ d: `M ${getters.positionSelected_get.cx} ${getters.positionSelected_get.cy} A ${raduis.r} ${raduis.r} 0 0 ${sweepflag} ${position.cx} ${position.cy}`,
                        type: 'horiz',
                        position_from: getters.positionSelected_get.id,
                        position_to: position.id,
                        function_id: getters.selectedFunction_get.id})
          } else if (/*getters.positionSelected_get.subfunction_id === position.subfunction_id &&*/ getters.positionSelected_get.radians === position.radians) {
            paths.push({ d: `M ${getters.positionSelected_get.cx} ${getters.positionSelected_get.cy} A 0 0 0 0 ${sweepflag} ${position.cx} ${position.cy}`,
                        type: getters.positionSelected_get.level_id < position.level_id ? 'up' : 'horiz',
                        position_from: getters.positionSelected_get.id,
                        position_to: position.id,
                        function_id: getters.selectedFunction_get.id})
          } else {
            raduis = getters.circleLevelsInMap_get.find(el => el.id === position.level_id);
            const middlePoint = {
              x: getters.x0_get - raduis.r * Math.cos(getters.positionSelected_get.radians),
              y: getters.y0_get - raduis.r * Math.sin(getters.positionSelected_get.radians),
            }
            getters.positionsInMap_get.forEach(el => {
              /*if (position.radians > getters.positionSelected_get.radians && sweepflag === 0) {
                if (el.radians < getters.positionSelected_get.radians || el.radians > position.radians) {
                  if (el.level_id === position.level_id) {
                    noDisplayPositions.push(el)
                  }
                }
              } else if (position.radians < getters.positionSelected_get.radians && sweepflag === 0) {
                if (el.radians > getters.positionSelected_get.radians || el.radians < position.radians) {
                  if (el.level_id === position.level_id) {
                    noDisplayPositions.push(el)
                  }
                }
              } else */if (position.radians === 0 && getters.positionSelected_get.radians >= 3.14159) {
                if (el.radians > getters.positionSelected_get.radians) {
                  if (el.level_id === position.level_id) {
                    el.on = position.id
                    noDisplayPositions.push(el)
                  }
                }
              } else if (getters.positionSelected_get.radians === 0 && position.radians >= 3.14159) {

                if (el.radians > position.radians) {
                  if (el.level_id === position.level_id) {
                    el.on = position.id
                    noDisplayPositions.push(el)
                  }
                }
              } else if (getters.positionSelected_get.radians < position.radians) {
                if (position.radians - getters.positionSelected_get.radians > 3.3) {
                  if (el.radians > position.radians || el.radians < getters.positionSelected_get.radians) {
                    if (el.level_id === position.level_id) {
                      el.on = position.id
                      noDisplayPositions.push(el)
                    }
                  }
                } else if (el.radians > getters.positionSelected_get.radians && el.radians < position.radians) {
                  if (el.level_id === position.level_id) {
                    el.on = position.id
                    noDisplayPositions.push(el)
                  }
                }
              } else if (getters.positionSelected_get.radians > position.radians){
                if (sweepflag === 1) {
                  if (el.radians < getters.positionSelected_get.radians && el.radians < position.radians) {
                    if (el.level_id === position.level_id) {
                      el.on = position.id
                      noDisplayPositions.push(el)
                    }
                  }  else if (el.radians > getters.positionSelected_get.radians && el.radians > position.radians) {
                    if (el.level_id === position.level_id) {

                      el.on = position.id
                      noDisplayPositions.push(el)
                    }
                  }
                } else if (el.radians < getters.positionSelected_get.radians && el.radians > position.radians) {
                  if (el.level_id === position.level_id) {
                    el.on = position.id
                    noDisplayPositions.push(el)
                  }
                }
              }
              if (middlePoint.x === el.cx && middlePoint.y === el.cy) {
                el.on = position.id
                noDisplayPositions.push(el)
              }
            })
            paths.push({ d: `M ${middlePoint.x} ${middlePoint.y} A ${raduis.r} ${raduis.r} 0 0 ${sweepflag} ${position.cx} ${position.cy}`,
                        type: getters.positionSelected_get.level_id < position.level_id ? 'up' : 'horiz',
                        position_from: getters.positionSelected_get.id,
                        position_to: position.id,
                        function_id: getters.selectedFunction_get.id});
            paths.push({ d: `M ${getters.positionSelected_get.cx} ${getters.positionSelected_get.cy} A 0 0 0 0 ${sweepflag} ${middlePoint.x} ${middlePoint.y}`,
                        type: getters.positionSelected_get.level_id < position.level_id ? 'up' : 'horiz',
                        position_from: getters.positionSelected_get.id,
                        position_to: position.id,
                        function_id: getters.selectedFunction_get.id});
          }
          commit('linksArcOnHover_set', { payload: paths } )
          commit('positionsNoDisplayOnHover_set', { payload: noDisplayPositions } )
      }

      const positionIntoTrack = position;
      if (getters.filteredPositionsUpOnPosSelected_get.find(el => el.id === position.id)) positionIntoTrack.type = 'hover_up';
      else positionIntoTrack.type = 'hover_horiz';

      commit('positionsIntoTrack_set', { payload: positionIntoTrack } )


  },

    mouseOutPosition: async function({ state, commit, dispatch, getters, rootGetters }) {
      commit('positionOnHover_set', { payload: null });
      commit('filteredLinksOnHover_set', { payload: [] });
      commit('filteredPositionsUpOnHover_set', { payload: [] });
      commit('filteredPositionsHorizHover_set', { payload: [] });
      commit('filteredPositionsUpFutureHover_set', { payload: [] });
      commit('filteredPositionsDisabledHover_set', { payload: [] });
      commit('linksArcOnHover_set', { payload: [] });
      commit('positionsNoDisplayOnHover_set', { payload: [] } );
      commit('positionsIntoTrack_set', { payload: null } );

      commit('functionsOnHover_set', { payload: [] })
      commit('positionsInFunctionOnHover_set', { payload: [] })
      commit('positionsToInSmallMap_set', {payload: [] })
      commit('linesToInSmallMap_set', {payload: [] })
      commit('positionHoveredInSmallMap_set', { payload: null });
  },

  selectedPosition: async function({ state, commit, dispatch, getters, rootGetters }, { payload }) {
    const { position, backToPosition } = payload;
    if (getters.positionSelected_get) if (getters.positionSelected_get.id === position.id) {
        if (getters.historyPositions_get.findIndex(el => el.id === position.id ) === 0) dispatch('refreshData', { destroy: true, selectNewFuction: true });
        else return;
    };
    if (!backToPosition) {
        if (getters.historyPositions_get.find(el => el.id === position.id)) {
          dispatch('backToPosition', { payload: {position} });
          return;
        }
    };
    if (!backToPosition) if (getters.filteredPositionsDisabledOnPosSelected_get.find(el => el.id === position.id)) return;
    if (getters.filteredPositionsUpFutureOnPosSelected_get.size > 0 ) {
      if (getters.filteredPositionsUpFutureOnPosSelected_get.has(position)) return;
    }
    const newHistory= state.historyPositions.slice();
    const lines = state.historyLinks.slice(),
          positions = state.positionsNoDisplay.slice(),
          positionsIntoTrack = state.positionsNoDisplayOnHover.slice();
    newHistory.push(position);
    for (let point of state.positionsNoDisplayOnHover) {
      positions.push(point)
    }
    for (let point of state.linksArcOnHover) {
      point.type = 'horiz'
      lines.push(point)
    };
    for (let point of getters.positionsIntoTrackToShow_get) {
      positionsIntoTrack.push(point)
    };
    if (positionsIntoTrack.length > 1) positionsIntoTrack[positionsIntoTrack.length - 2].type='horiz';
    positionsIntoTrack[positionsIntoTrack.length - 1].type='last'

    const positionSelectedInfo = getters.positionList_get.find(el => el.id === position.id)

    commit('positionSelectedInfo_set', {payload: positionSelectedInfo})

    const filteredLinks = getters.linkList_get.filter(x => x.position_from === position.id);

    const positionsList = filteredLinks.map(el => el.position_to);
    positionsList.push(position.id)
    dispatch('VacancyCreator/vacancyListGetByIdList', { payload: { idList: positionsList }}, { root: true });

    commit('positionsToInSmallMapOnSelect_set', {payload: getters.positionsToAnotherFuncOnHover_get })

    commit('historyPositions_set', { payload: newHistory });
    commit('historyLinks_set', { payload: lines });
    commit('positionSelected_set', { payload: position });
    commit('filteredLinksOnPosSelected_set', { payload: getters.filteredLinksOnHover_get });
    commit('filteredPositionsUpOnPosSelected_set', { payload: state.filteredPositionsUpOnHover});
    commit('filteredPositionsHorizOnPosSelected_set', { payload: state.filteredPositionsHorizHover });
    commit('filteredPositionsUpFutureOnPosSelected_set', { payload: getters.filteredPositionsUpFutureHover_get});
    commit('filteredPositionsDisabledOnPosSelected_set', { payload: state.filteredPositionsDisabledHover });
    commit('positionsNoDisplay_set', { payload: positions });
    commit('positionsIntoTrackHistory_set', { payload: positionsIntoTrack } )
    commit('positionsIntoTrack_set', { payload: null } )
  },

    backToPosition: async function({ state, commit, dispatch, getters, rootGetters }, { payload }) {
    const { position } = payload;
    if (position.id === state.positionSelected.id) return;
    const indexInMap = getters.historyPositions_get.findIndex(el => el.id === position.id);
    getters.historyPositions_get.splice(indexInMap, getters.historyPositions_get.length);

    const indexInTrack = getters.positionsIntoTrackHistory_get.findIndex(el => el.id === position.id);
    getters.positionsIntoTrackHistory_get.splice(indexInTrack, getters.positionsIntoTrackHistory_get.length);
    if (getters.historyPositions_get.length > 0) {
      commit('positionSelected_set', { payload: getters.historyPositions_get[getters.historyPositions_get.length-1] });
      const indexLines = state.historyLinks.findIndex(el => el.position_from === position.id);
      state.historyLinks.splice(indexLines, state.historyLinks.length)
      const indexNoDisplayPosition = state.positionsNoDisplay.findIndex(el => el.on === position.id);
      state.positionsNoDisplay.splice(indexNoDisplayPosition, state.positionsNoDisplay.length)
    } else {
      commit('positionSelected_set', { payload: null });
      commit('linksArcOnHover_set', { payload: [] } )
      commit('historyLinks_set', { payload: [] })
      commit('positionsNoDisplay_set', { payload: [] })
      commit('positionsNoDisplayOnHover_set', { payload: [] })
    }

    const functionName = getters.functionList_get.find(el => {
      const subfunc = getters.subfunctionList_get.find(el => el.id === position.subfunction_id);
      if (el.id === subfunc.function_id) {
        return el;
      }
    })

    if (functionName.id !== getters.selectedFunction_get.id) {
      console.log('choseFunction')
      dispatch('choseFunction', { payload: { functionId: functionName.id, noRefresh: false } })
      .then(async () => {
        await dispatch('mouseOverPosition', { payload: { position, backToPosition: true } })
        await dispatch('selectedPosition', { payload: { position, backToPosition: true } })
        await dispatch('mouseOutPosition')
      })
    } else {
      await dispatch('mouseOverPosition', { payload: { position, backToPosition: true } })
      await dispatch('selectedPosition', { payload: { position, backToPosition: true } })
      await dispatch('mouseOutPosition')
    }


  },


  async refreshData({ state, commit, dispatch, getters, rootGetters }, { destroy, selectNewFuction }) {
    console.log('destroy', destroy)
    if (!selectNewFuction) commit('selectedFunction_set', {payload: null})
    commit('positionSelectedInfo_set', {payload: null})
    commit('positionOnHover_set', { payload: null });
    commit('filteredLinksOnHover_set', { payload: [] });
    commit('filteredPositionsUpOnHover_set', { payload: [] });
    commit('filteredPositionsHorizHover_set', { payload: [] });
    commit('filteredPositionsUpFutureHover_set', { payload: [] });
    commit('filteredPositionsDisabledHover_set', { payload: [] });
    commit('linksArcOnHover_set', { payload: [] });
    commit('positionsNoDisplayOnHover_set', { payload: [] } )
    commit('positionsIntoTrack_set', { payload: null } )

    commit('functionsOnHover_set', { payload: [] })
    commit('positionsInFunctionOnHover_set', { payload: [] })
    commit('positionsToInSmallMap_set', {payload: [] })
    commit('linesToInSmallMap_set', {payload: [] })
    commit('positionHoveredInSmallMap_set', { payload: null });

    commit('functionsOnSelect_set', { payload: [] })
    commit('positionsInFunctionOnSelect_set', { payload: [] })
    commit('positionsToInSmallMapOnSelect_set', {payload: [] })
    commit('linesToInSmallMapOnSelect_set', {payload: [] })
    commit('positionOnSelectInSmallMap_set', { payload: null });

    if (destroy) commit('historyPositions_set', { payload: [] });
    if (destroy) commit('historyLinks_set', { payload: [] });
    if (destroy) commit('positionSelected_set', { payload: null });
    commit('filteredLinksOnPosSelected_set', { payload: [] });
    commit('filteredPositionsUpOnPosSelected_set', { payload: [] });
    commit('filteredPositionsHorizOnPosSelected_set', { payload: [] });
    commit('filteredPositionsUpFutureOnPosSelected_set', { payload: []});
    commit('filteredPositionsDisabledOnPosSelected_set', { payload: [] });
    if (destroy) commit('positionsNoDisplay_set', { payload: [] });
    if (destroy) commit('positionsIntoTrackHistory_set', { payload: [] } )
  },
}



export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
