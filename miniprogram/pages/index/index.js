const dayjs = require('dayjs')

let now = dayjs()
let today = now.startOf('day')

let timeIntervals = {
  1: [{h: 6, m: 0}, {h: 8, m: 45}],
  2: [{h: 8, m: 45}, {h: 9, m: 40}],
  3: [{h: 9, m: 40}, {h: 10, m: 40}],
  4: [{h: 10, m: 40}, {h: 11, m: 35}],
  5: [{h: 11, m: 35}, {h: 12, m: 30}],
  6: [{h: 12, m: 30}, {h: 14, m: 15}],
  7: [{h: 14, m: 15}, {h: 15, m: 10}],
  8: [{h: 15, m: 10}, {h: 16, m: 10}],
  9: [{h: 16, m: 10}, {h: 17, m: 5}],
  10: [{h: 17, m: 5}, {h: 18, m: 0}],
  11: [{h: 18, m: 0}, {h: 19, m: 15}],
  12: [{h: 19, m: 15}, {h: 20, m: 10}],
  13: [{h: 20, m: 10}, {h: 21, m: 5}],
  14: [{h: 21, m: 5}, {h: 22, m: 30}]
}

let nowInterval = 0
for (let i in timeIntervals) {
  let startTime = today.add(timeIntervals[i][0].h, 'hour').add(timeIntervals[i][0].m, 'minute')
  let endTime = today.add(timeIntervals[i][1].h, 'hour').add(timeIntervals[i][1].m, 'minute')
  if (now.isAfter(startTime) && now.isBefore(endTime)) {
    nowInterval = i
    break
  }
}

let dates = []
for (let i of [0, 1, 2, 3, 4, 5, 6]) {
  let day = today.add(i, 'day')
  dates.push(day.format('YYYY-MM-DD'))
}

let choosedDate = dates[0]

const campuses = ["邯郸校区", "江湾校区", "枫林校区", "张江校区"]

let choosedCampus = "邯郸校区"

const buildings = {
  "邯郸校区": ["HGX", "H2", "H3", "H4", "H5", "H6"],
  "江湾校区": ["JA", "JB"],
  "枫林校区": ["F1", "F2"],
  "张江校区": ["Z2"]
}

let choosedBuilding= "HGX"

Page({
  data: { dates, choosedDate, nowInterval, campuses, choosedCampus, buildings, choosedBuilding },

  onLoad: function(options) {
    let _this = this

    _this.setData({
      data: 0
    })

    wx.request({
      url: "https://fdu-classrooms-data.vercel.app/data/" + dates[0] + ".json",
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        _this.setData({
          data: res.data
        })
      }
    })
  },

  tapDate: function(event) {
    let _this = this
    const date = event.currentTarget.dataset.date

    _this.setData({
      data: 0
    })

    wx.request({
      url: "https://fdu-classrooms-data.vercel.app/data/" + date + ".json",
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        _this.setData({
          data: res.data
        })
      }
    })

    this.setData({ choosedDate: date })
  },

  tapCampus: function(event) {
    const campus = event.currentTarget.dataset.campus
    this.setData({ choosedCampus: campus, choosedBuilding: buildings[campus][0] })
  },

  tapBuilding: function(event) {
    const building = event.currentTarget.dataset.building
    this.setData({ choosedBuilding: building })
  }
})
