import './Calendar.css';
import { seq } from 'fpts/maths';
import { map as imap, filter } from 'fpts/iter';
import { pipe } from 'fpts/function';
import { ofVN, get } from 'fpts/map';
import { Option, pipe as pipeO } from 'fpts/option';
import { of } from 'fpts/array';
import { h } from 'vue';
import { VNode } from 'vue/types/umd';

export type Data = {
   date: Date;
   duration: 1 | 2 | 3 | 4 | 5;
   id: any;
}

export interface Props {
   data: Data[];
   as: string;
}

export interface Methods {
   getDaysInMonth: (month: number) => number;
}

export interface EmitMap {
   setDate: [DragEvent, Date];
}

export interface This extends Props, Methods {
   current_year: number;
   cellWidth: 3;
   cellHeight: 3;
   months: [string, string, string, string, string, string, string, string, string, string, string, string];
   monthdays: Array<{name: string; days: string[]}>;
   grouped_data: Map<number, Map<number, Map<number, Data>>>;
   $emit: <K extends keyof EmitMap>(event: K, value: EmitMap[K]) => void;
   $scopedSlots: {
      entry: (entry: Data) => VNode;
   };
}

const preventDefault = (e: Event) => e.preventDefault();

const Component = {
   props: {
      data: {
         required: true,
         type: Array,
      },
      as: {
         required: false,
         type: String,
         default: 'figure',
      },
   },

   data(this: This) {
      return {
         current_year: new Date().getFullYear(),
         cellWidth: 3,
         cellHeight: 3,
      };
   },

   computed: {
      months(this: This) {
         return pipe(
            seq(0, 11),
            imap(x => new Date(2020, x, 1).toLocaleString('default', { month: 'long' })),
            of,
         );
      },

      monthdays(this: This) {
         return this.months.map((month_name, month) => ({
            name: month_name,
            days: pipe(
               seq(1, this.getDaysInMonth(month)),
               imap((day) => new Date(this.current_year, month, day).toLocaleString('default', { weekday: 'short' })),
               of,
            ),
         }));
      },

      grouped_data(this: This) {
         return pipe(
            this.data,
            filter(x => x.date && x.date.getFullYear() === this.current_year),
            ofVN(x => x.date.getMonth(), x => x.date.getDate() - 1, x => x.date.getHours())
         );
      }
   },

   methods: {
      getDaysInMonth(this: This, month: number) {
         return new Date(this.current_year, month+1, 0).getDate();
      },
   },

   render(this: This) {
      let skip = 0;
      const Hour = (M: number, d: number) => (hr: number) => {
         if (skip > 0) {
            skip -= 1;
            return '';
         }
         const entry: Option<Data> = pipeO(this.grouped_data, get(M), get(d), get(hr));
         if (!entry)
            return empty_hour(M, d, hr);
         skip = entry.duration - 1;
         return h('div', {
            style: {
               width: this.cellWidth + 'rem',
               height: entry.duration*this.cellHeight + 'rem',
            }
         }, [this.$scopedSlots.entry(entry)]);
      };

      const empty_hour = (M, d, hr: number) => h('div', {
         class: 'hour',
         style: {
            width: this.cellWidth + 'rem',
            height: this.cellHeight + 'rem',
         },
         on: {
            dragenter: preventDefault,
            dragover: preventDefault,
            drop: (event: DragEvent) => {
               this.$emit('setDate', [event, new Date(this.current_year, M, d+1, hr, 0, 0)]);
            },
         },
      }, hr.toString());

      return h(this.as, {
         class: 'calendar',
      }, [
         h('header',
            this.monthdays.map(m =>
               h('div', { class: 'month' }, [
                  h('div', { class: 'name' }, m.name),
                  h('div', { class: 'days' }, m.days.map((d, i) =>
                     h('div', {
                        class: 'day',
                        style: {
                           width: this.cellWidth + 'rem',
                        },
                     }, [
                        h('div', { class: 'name' }, d),
                        h('div', { class: 'number' }, (i+1).toString()),
                     ])
                  ))
               ]),
            ),
         ),
         h('div', { class: 'body' }, [
            this.monthdays.map((m, monthNumber) =>
               h('div', { class: 'month' }, m.days.map((d, dayNumber) =>
                  h('div', { class: 'day' }, [
                     h('div', { class: 'hours' }, of(seq(0, 23)).map(Hour(monthNumber, dayNumber)))
                  ])
               ))
            ),
         ])
      ]);
   },
};

export default Component;
