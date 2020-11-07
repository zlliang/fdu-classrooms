const dayjs = require('dayjs')

let dates = []

let choosedDate = ""

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
  data: { dates, choosedDate, campuses, choosedCampus, buildings, choosedBuilding },

  onLoad: function(options) {
    let _this = this

    let today = dayjs()
    dates = []
    for (let i of [0, 1, 2, 3, 4, 5, 6]) {
      let day = today.add(i, 'day')
      dates.push(day.format('YYYY-MM-DD'))
    }

    _this.setData({
      data: 0,
      dates: dates,
      choosedDate: dates[0]
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
