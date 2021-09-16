let weekSchedule = [
    {
        num: 1,
        name: "Monday",
        portugueseName: "Segunda-feira",
        workTime: [
            {
                start: "8:00",
                end: "19:00"
            }
        ]
    },
    {
        num: 2,
        name: "Tuesday",
        portugueseName: "Terça-feira",
        workTime: [
            {
                start: "8:00",
                end: "19:00"
            }
        ]
    },
    {
        num: 3,
        name: "Wednesday",
        portugueseName: "Quarta-feira",
        workTime: [
            {
                start: "8:00",
                end: "19:00"
            }
        ]
    },
    {
        num: 4,
        name: "Thursday",
        portugueseName: "Quinta-feira",
        workTime: [
            {
                start: "8:00",
                end: "19:00"
            }
        ]
    },
    {
        num: 5,
        name: "Friday",
        portugueseName: "Sexta-feira",
        workTime: [
            {
                start: "8:00",
                end: "19:00"
            }
        ]
    }
]

let offset = -3

function run(offset, weekSchedule) {
    offset = parseInt(offset)
    //weekSchedule = JSON.parse(weekSchedule) se usar no blip e tiver uma agenda separada precisa desse parse
    let today = nowUTC(offset)
    if (isWorkDay(today, weekSchedule)) {
        let todaySchedule = getTodaySchedule(weekSchedule, today)
        let intervalTime = getIntervalTime(todaySchedule)
        if(checkTime(intervalTime, today)) return {'isWorkTime': true, 'weekDay': todaySchedule.portugueseName}
        return false
    }
    return false
}

function getIntervalTime(todaySchedule) {
    let intervalTime = []
    for (let i = 0; i < todaySchedule.workTime.length; i++) {
        intervalTime.push({
            start: utcDate(todaySchedule.workTime[i].start),
            end: utcDate(todaySchedule.workTime[i].end)
        })
    }
    return intervalTime
}

function checkTime(intervalTime, today) {
    for (let i = 0; i < intervalTime.length; i++) {
        if (today - intervalTime[i].start > 0 && intervalTime[i].end - today > 0)
            return true
    }
    return false
}

function getTodaySchedule(weekSchedule, today) {
    for (let i = 0; i < weekSchedule.length; i++) {
        if (weekSchedule[i].num == today.getDay()) return weekSchedule[i]
    }
}

function nowUTC(offset) {
    let now = new Date()
    let utc_timestamp = Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds(),
        now.getUTCMilliseconds()
    )
    return new Date(utc_timestamp + offset * 3600 * 1000)
}

function utcDate(timeString) {
    let now = new Date()
    let hour = getValueByString("hour", timeString)
    let minutes = getValueByString("minutes", timeString)
    let utc_timestamp = Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        hour,
        minutes,
        0,
        0
    )
    return new Date(utc_timestamp)
}

function getValueByString(type, timeString) {
    if (type === "hour") {
        return parseInt(timeString.substring(0, timeString.indexOf(":")))
    } else if (type === "minutes") {
        return parseInt(
            timeString.substring(timeString.indexOf(":") + 1, timeString.length)
        )
    }
    return 0
}

function isWorkDay(today, workDays) {
    for (let i = 0; i < workDays.length; i++) {
        if (workDays[i].num == today.getDay().toString()) return true
    }
    return false
}
console.log(run(offset, weekSchedule))
