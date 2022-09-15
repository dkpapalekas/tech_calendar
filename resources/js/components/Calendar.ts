import './Calendar.css';
import { seq } from 'fpts/maths';
import { map as imap, filter } from 'fpts/iter';
import { pipe } from 'fpts/function';
import { ofVN, get } from 'fpts/map';
import { Option, pipe as pipeO } from 'fpts/option';

type Data = {
   date: Date;
   duration: 1 | 2 | 3 | 4 | 5;
   id: any;
}

export default {
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

   data() {
      return {
         current_year: new Date().getFullYear(),
         cellWidth: 3,
         cellHeight: 3,
      };
   },

   computed: {
      months() {
         return pipe(
            seq(0, 11),
            imap(x => new Date(2020, x, 1).toLocaleString('default', { month: 'long' })),
            Array.from,
         ) as [string, string, string, string, string, string, string, string, string, string, string, string];
      },

      monthdays() {
         return this.months.map((month_name: string, month: number) => ({
            name: month_name,
            days: pipe(
               seq(1, this.getDaysInMonth(month)),
               imap((day: number) => new Date(this.current_year, month, day).toLocaleString('default', { weekday: 'short' })),
               Array.from,
            ),
         }));
      },

      grouped_data() {
         return pipe(
            this.data as Array<Data>,
            filter(x => x.date.getFullYear() === this.current_year),
            ofVN(x => x.date.getMonth(), x => x.date.getDate() - 1, x => x.date.getHours())
         );
      }
   },

   methods: {
      getDaysInMonth(month: number) {
         return new Date(this.current_year, month+1, 0).getDate();
      },
   },

   render(h) {
      let skip = 0;
      const Hour = (M, d) => hr => {
         if (skip > 0) {
            skip -= 1;
            return '';
         }
         const entry: Option<Data> = pipeO(this.grouped_data, get(M), get(d), get(hr));
         if (!entry)
            return empty_hour(hr);
         skip = entry.duration - 1;
         return filled_hour(entry);
      };

      const empty_hour = (hr) => h('div', {
         class: 'hour',
         style: {
            width: this.cellWidth + 'rem',
            height: this.cellHeight + 'rem',
         }
      }, hr.toString());

      const filled_hour = (entry: Data) => h('div', {
         class: {
            hour: true,
            red: true,
         },
         style: {
            width: this.cellWidth + 'rem',
            height: entry.duration*this.cellHeight + 'rem',
         }
      }, entry.duration);

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
                     h('div', { class: 'hours' }, Array.from(seq(0, 23)).map(Hour(monthNumber, dayNumber)))
                  ])
               ))
            ),
         ])
      ]);
   },
};
