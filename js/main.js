const arrH = document.querySelector('.arrH')
const arrM = document.querySelector('.arrM')
const arrS = document.querySelector('.arrS')
const numH = document.querySelector('.numH span')
const numM = document.querySelector('.numM span')
const numS = document.querySelector('.numS span')
const tabsLinks = document.querySelectorAll('.tabsPanel-links a')
const tabsItems = document.querySelectorAll('.tabsPanel-items__content')
const watchH = document.querySelector('.watchH span')
const watchM = document.querySelector('.watchM span')
const watchS = document.querySelector('.watchS span')
const watchMi = document.querySelector('.watchMi span')
const startBtn = document.querySelector('.start')
const resultBtn = document.querySelector('.result')
const stopWatchResult = document.querySelector('.stopWatch-result')
const indicator = document.querySelector('.indicator')
const timerH = document.querySelector('.timerH input')
const timerM = document.querySelector('.timerM input')
const timerS = document.querySelector('.timerS input')
const timerMi = document.querySelector('.timerMi input')
const timerStartBtn = document.querySelector('.timer-start')
const timerClearBtn = document.querySelector('.timer-clear')

// time
timerStartBtn.addEventListener('click',function(){
  let valueH = timerH.value
  let valueM = timerM.value
  let valueS = timerS.value
  let valueMi = timerMi.value
  if(timerStartBtn.innerHTML == 'start'){
    timerStartBtn.innerHTML = 'pause'
    timer(valueH,valueM,valueS,valueMi,timerStartBtn)
    timerH.disabled = true
    timerM.disabled = true
    timerS.disabled = true
    timerMi.disabled = true
  }else{
    timerStartBtn.innerHTML = 'start'
  }
})
timerClearBtn.addEventListener('click', function(){
  timerH.value = ''
  timerM.value = ''
  timerS.value = ''
  timerMi.value = ''
  timerStartBtn.innerHTML = 'start'
  timerH.disabled = false
  timerM.disabled = false
  timerS.disabled = false
  timerMi.disabled = false
})
function  timer(h,m,s,mi,btn) {
  if(btn.innerHTML == 'pause'){
    timerH.value = h<10?`0${h}`:h
    timerM.value = m<10?`0${m}`:m
    timerS.value = s<10?`0${s}`:s
    if(mi == 0){
      mi = 99
      timerMi.value = mi<10?`0${mi}`:mi
      if(s == 0){
        s = 59
        timerS.value = s<10?`0${s}`:s
        if(m == 0){
          m = 59
          timerM.value = m<10?`0${m}`:m
          if(h == 0){
            h = 23
            timerH.value = h<10?`0${h}`:h
          }else{
            h--
            timerH.value = h<10?`0${h}`:h
          }
        }else{
          m--
          timerM.value = m<10?`0${m}`:m
        }
      }else{
        s--
        timerS.value = s<10?`0${s}`:s
      }
    }else{
      mi--
      timerMi.value = mi<10?`0${mi}`:mi
    }
    if(h>0 || m>0 || s>0 || mi>0){
      setTimeout(function(){
        timer(h,m,s,mi,btn)
      }, 10.101010)
    }else{
      timerH.disabled = false
      timerM.disabled = false
      timerS.disabled = false
      timerMi.disabled = false
      timerH.value = ''
      timerM.value = ''
      timerS.value = ''
      timerMi.value = ''
      btn.innerHTML = 'start'
    }
  }
}

// stopwatch
resultBtn.addEventListener('click', function(){
  stopWatchResult.innerHTML += `<p>${watchH.innerHTML}:${watchM.innerHTML}:${watchS.innerHTML}:${watchMi.innerHTML}</p>`
})
startBtn.addEventListener('click', function(){
  if(startBtn.innerHTML == 'start'){
    startBtn.innerHTML = 'stop'
    indicator.classList.add('start')
    stopWatch(0,0,0,0,startBtn)
  }else if(startBtn.innerHTML == 'stop'){
    startBtn.innerHTML = 'clear'
    indicator.classList.remove('start')
    indicator.classList.add('stop')
  }else{
    startBtn.innerHTML = 'start'
    indicator.classList.remove('stop')
    watchH.innerHTML = '00'
    watchM.innerHTML = '00'
    watchS.innerHTML = '00'
    watchMi.innerHTML = '00'
    stopWatchResult.innerHTML = ''
  }
})
function stopWatch(h,m,s,mi,btn){
  if(btn.innerHTML == 'stop'){
    if(mi == 99){
      mi = 0
      watchMi.innerHTML = mi<10?`0${mi}`:mi
      if(s == 59){
        s = 0
        watchS.innerHTML = s<10?`0${s}`:s
        if(m == 59){
          m = 0
          h++
          watchM.innerHTML = m<10?`0${m}`:m
          watchH.innerHTML = h<10?`0${h}`:h
        }else{
          m++
          watchM.innerHTML = m<10?`0${m}`:m
        }
      }else{
        s++
        watchS.innerHTML = s<10?`0${s}`:s
      }
    }else{
      mi++
      watchMi.innerHTML = mi<10?`0${mi}`:mi
    }
    setTimeout(function(){
      stopWatch(h,m,s,mi,btn)
    }, 10.101010)
  }
}
// tabs
tabsLinks.forEach(function(link, key){
  link.addEventListener('click', function(){
    for(let i = 0; i < tabsLinks.length; i++){
      tabsLinks[i].classList.remove('active')
      tabsItems[i].classList.remove('active')
    }
    tabsLinks[key].classList.add('active')
    tabsItems[key].classList.add('active')
  })
})
// watch
function clock(){
  const time = new Date();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  
  arrS.style.transform = `rotate(${seconds * 6}deg)`
  arrM.style.transform = `rotate(${minutes * 6}deg)`
  arrH.style.transform = `rotate(${hours * 30 + (minutes / 2)}deg)`
  
  numS.innerHTML = seconds<10?`0${seconds}`:seconds;
  numH.innerHTML = hours<10?`0${hours}`:hours;
  numM.innerHTML = minutes<10?`0${minutes}`:minutes;
  
  setTimeout(function(){
    clock();
  }, 1000);
}
clock()