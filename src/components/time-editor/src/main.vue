<template>
    <div class="time-editor">
        <div class="calendar">
            <table class="calendar-table" :class="{'calendar-table-hour':interval === 60}">
                <thead class="calendar-head">
                <tr>
                    <th rowspan="8" class="week-td">星期/时间</th>
                    <th :colspan="12*colspan">00:00 - 12:00</th>
                    <th :colspan="12*colspan">12:00 - 24:00</th>
                </tr>
                <tr>
                    <td :colspan="colspan" v-for="h in hourList" :key="h">{{h}}</td>
                </tr>
                </thead>
                <tbody class="calendar-body" @mousedown='mouseDownHandler($event)' @mouseup='mouseUpHandler($event)'
                       @mousemove='mouseMoveHandler($event)'>
                <tr v-for="(w, $index) in week" :key="$index">
                    <td>{{w}}</td>
                    <td :data-week="$index" :data-time="h" class="un-selected" v-for="h in timeList"
                        :key="h"
                        :class="{'active': currentValue[$index] && currentValue[$index].indexOf(h) !== -1}"></td>
                </tr>
                <tr>
                    <td :colspan="this.timeList.length + 1" class="clear-bar">
                        <span class="pull-left">可拖动鼠标选择时间段</span>
                        <a class="pull-right" href="javascript:void(0)" @mouseup.stop="clearSelectedTime" @mousedown.stop="">清空选择</a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TimeEditor',
        components: {},
        props: {
            value: {
                type: Array,
                required: true
            },

            week: {
                type: Array,
                default() {
                    return ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
                },
            },

            hour: {
                type: [Number, Array],
                default: 24
            },

            interval: {
                type: Number,
                default: 60,
            }
        },

        data() {
            const NONE = 'NONE';
            const DOWN = 'DOWN';
            const MOVE = 'MOVE';
            return {
                toString: Object.prototype.toString,
                currentValue: this.value,
                colspan: 1,
                hourList: [],
                timeList: [],
                startSrcElement: null,
                endSrcElement: null,
                isActive: false,
                status: NONE,
                NONE,
                DOWN,
                MOVE,
                timer: null,
                tooltipText: '星期日 16:30',
            }
        },

        created() {
            this.init();
        },

        mounted() {
            document.querySelector('.time-editor .calendar').addEventListener('mouseup', this.mouseUpHandler);
        },

        destroyed() {
            document.querySelector('.time-editor .calendar').removeEventListener('mouseup', this.mouseUpHandler);
        },

        methods: {
            init() {
                this.setTimesData();
            },

            setTimesData() {
                this.setColspan();
                this.setHourList();
                this.setTimeList();
            },

            setColspan() {
                this.colspan = 60 / this.interval;
            },

            setHourList() {
                let weekType = this.toString.apply(this.hour);
                if (weekType === '[object Number]') {
                    this.convertNumberToArray();
                } else if (weekType === '[object Array]') {
                    this.convertArrayToArray();
                }
            },

            convertNumberToArray() {
                if (this.hour > 24 || this.hour < 0) {
                    throw new Error('Hour cannot be less than 0 greater than 23');
                }

                this.hourList = [];
                for (let i = 0; i < this.hour; i++) {
                    this.hourList.push(i);
                }
            },

            convertArrayToArray() {
                this.hourList = [];
                this.hourList = this.hour.sort((a, b) => a < b ? 1 : -1);
            },

            setTimeList() {
                this.timeList = [];
                for (let i = 0, len = this.hourList.length * this.colspan; i < len; i++) {
                    this.timeList.push(i);
                }
            },

            setStatus(status = 'NONE') {
                this.status = status;
            },

            setIsActive(isActive = false) {
                this.isActive = isActive;
            },

            setTooltipText(tooltipText) {
                this.tooltipText = tooltipText;
            },

            isStatus(status = 'NONE') {
                return this.status === status;
            },

            mouseDownHandler($event) {
                if (!$event) return;
                this.startSrcElement = $event.srcElement;
                this.endSrcElement = $event.srcElement;
                this.setIsActive(this.startSrcElement.className.indexOf('active') !== -1);
                this.setStatus(this.DOWN);
                this.startSrcElement === this.endSrcElement && this.setMultipleSelectedTime();
            },

            mouseUpHandler($event) {
                if (!$event) return;
                this.setStatus(this.NONE);
            },

            mouseMoveHandler($event) {
                if (!$event || $event.srcElement.className.indexOf('un-selected') === -1) return;
                this.endSrcElement = $event.srcElement;
                this.isStatus(this.DOWN) && this.setStatus(this.MOVE);
                this.isStatus(this.MOVE) && this.setMultipleSelectedTime();
            },

            mouseOverHandler($event) {
                if (!$event) return;
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                this.setTooltipText('');
                this.timer = setTimeout(() => {
                    if ($event.srcElement.className.indexOf('un-selected') !== -1) {
                        let startWeek = +$event.srcElement.getAttribute('data-week');
                        let startTime = +$event.srcElement.getAttribute('data-time');
                        this.$refs.tooltip.style.transform = "translate3d(" + (-70 + $event.layerX + 'px') + ", " + (-75 + $event.layerY + 'px') + ", 0px)";
                        this.setTooltipText(`${this.week[startWeek]} ${this.minuteConvertHourText(startTime * this.interval + this.interval)}`);
                    }
                }, 1000);
            },

            setMultipleSelectedTime() {
                if (!this.startSrcElement || !this.endSrcElement || this.isStatus(this.NONE) && this.reset()) return;
                let startWeek = +this.startSrcElement.getAttribute('data-week');
                let startTime = +this.startSrcElement.getAttribute('data-time');
                let endWeek = +this.endSrcElement.getAttribute('data-week');
                let endTime = +this.endSrcElement.getAttribute('data-time');
                if (startWeek > endWeek) {
                    [startWeek, endWeek] = [endWeek, startWeek];
                }
                if (startTime > endTime) {
                    [startTime, endTime] = [endTime, startTime];
                }
                for (let i = startWeek; i <= endWeek; i++) {
                    for (let j = startTime; j <= endTime; j++) {
                        if (!this.currentValue[i]) {
                            this.$set(this.currentValue, i, []);
                        }
                        const index = this.currentValue[i].indexOf(j);
                        if (index !== -1 && this.isActive) { //取消
                            this.currentValue[i].splice(index, 1);
                        } else if (index === -1 && !this.isActive) {
                            this.currentValue[i].push(j);
                        }
                    }
                }

                // 将null转化为[]
                for (let i = 0; i < this.currentValue.length; i++) {
                    if (!this.currentValue[i]) {
                        this.currentValue.splice(i, 1, []);
                    }
                }

                // 补全[]
                const needAddArrayNumber = 7 - this.currentValue.length;
                for (let i = 0; i < needAddArrayNumber; i++) {
                    this.currentValue.push([]);
                }

                this.$emit('change', this.currentValue);
            },

            clearSelectedTime() {
                this.currentValue.forEach((item, index) => this.$set(this.currentValue, index, []));
            },

            reset() {
                this.startSrcElement = null;
                this.endSrcElement = null;
            },

            minuteConvertHourText(minute) {
                let hour = minute / 60,
                    array = hour.toString().split('.'),
                    text;
                if (array.length === 1) {
                    hour < 10 ? text = `0${hour}:00` : text = `${hour}:00`;
                } else {
                    hour < 10 ? text = `0${array[0]}:` + array[1] * 60 / 10 : text = `${array[0]}:` + array[1] * 60 / 10;
                }
                return text;
            }
        },

        watch: {
            currentValue(val, old) {
                if (val) {
                    this.setTimesData();
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .time-editor {
        .calendar {
            background-color: #fff;
            -webkit-user-select: none;
            position: relative;
            display: inline-block;

            .week-td {
                width: 70px;
            }

            .calendar-table {
                border-collapse: collapse;
                td, tr, th {
                    border: 1px solid #dee4f5;
                    font-size: 12px;
                    text-align: center;
                    min-width: 12px;
                    line-height: 1.8em;
                    -webkit-transition: background .2s ease;
                    -moz-transition: background .2s ease;
                    -ms-transition: background .2s ease;
                    transition: background .2s ease;
                }

                td {
                    &.un-selected {
                        background: #f5f5f5;
                    }

                    &.active {
                        background: #2d8cf0;
                    }
                }

                .clear-bar {
                    line-height: 2.4em;
                    padding: 0 18px;

                    .pull-left {
                        float: left;
                    }

                    .pull-right {
                        float: right;
                    }
                }

            }

            .calendar-table-hour {
                td, tr, th {
                    min-width: 18px;
                }
            }
        }

        .byted-popover {
            width: 128px;
            padding: 12px 0;
            .bui-popover-arrow {
                bottom: 7px;
                border-top-width: 0;
                border-right-width: 1px;
                border-bottom-width: 1px;
                border-left-width: 0;
                box-shadow: 3px 3px 7px 0 #d4d7e4;
                left: 59px;
                position: absolute;
                width: 10px;
                height: 10px;
                background-color: #fff;
                transform: rotate(45deg);
                border-radius: 2px;
                border: none;
            }

            .bui-popover-panel {
                padding: 15px 20px;
                background-color: #fff;
                border-radius: 2px;
                border: 1px solid #dee4f5;
                box-shadow: 0 3px 7px 0 #d4d7e4;
            }
        }
    }
</style>
