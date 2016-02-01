import moment from 'moment';
import React, {PropTypes} from 'react';
import Globalize from 'globalize';
import SleepTracker from "./SleepTracker.react";
import AlertnessTracker from "./AlertnessTracker.react";

import { DateTimePicker } from 'react-widgets';
//import 'less!react-widgets/lib/less/react-widgets.less';

export default React.createClass({

  contextTypes: { flux: PropTypes.object.isRequired },

  componentWillMount() {
    const { flux } = this.context;
  },

  componentDidMount() {
    const { flux } = this.context;
    flux.getStore('submit').listen(this.submitStateChanged);
    flux.getStore('date').listen(this.dateStateChanged);
  },

  componentWillUnmount() {
    const { flux } = this.context;
    flux.getStore('submit').unlisten(this.submitStateChanged);
    flux.getStore('date').unlisten(this.dateStateChanged);
  },

  submitStateChanged(state) {
    this.setState(this.getStateFromSubmitStore());
  },

  dateStateChanged(state) {
    this.setState(this.getStateFromDateStore());
  },

  getInitialState() {
    return {
      canSubmit: this.getStateFromSubmitStore().canSubmit,
      selectedDate: this.getStateFromDateStore().selectedDate
    };
  },

  getStateFromSubmitStore() {
    const { flux } = this.context;

    let components = flux.getStore('submit').getState().get('submittableComponents');
    let canSubmit = true;
    for (let key of components.keys()) {
      if (!components.has(key) || !components.get(key).get('canSubmit')) {
        canSubmit = false;
        break;
      }
    }

    return {
      canSubmit: canSubmit
    };    
  },

  getStateFromDateStore() {
    const { flux } = this.context;
    let date = flux.getStore('date').getState().get('selectedDate');

    return {
      selectedDate: moment(date)
    };    
  },

  render() {
    let isDisabled = !this.state.canSubmit;
    this.trackers = [];

    let date = this.state.selectedDate.toDate();
    let maxDate = moment().startOf('day').toDate();

    return (
      <aside className="sleepAlertness">
        <ul>
          <li>
            <div className="headerContainer sleepAlertnessHeader">
                <h2>{Globalize.formatMessage('tracking-selectDate')}</h2>
                <DateTimePicker time={false} format="MMM dd, yyyy" defaultValue={date} max={maxDate} onChange={this.updateDate} />
            </div>
          </li>
          <SleepTracker ref={ (ref) => {if (ref !== null ) this.trackers.push(ref);} } />
          <AlertnessTracker ref={ (ref) => {if (ref !== null ) this.trackers.push(ref);} } />
          <li>
            <strong className="numBG">3</strong>
            <div><button className="graphData" type="submit" onClick={this.handleSubmit} disabled={isDisabled}>{Globalize.formatMessage('tracking-submit')}</button></div>
          </li>            
        </ul>
      </aside>
    );
  },

  updateDate(date, dateStr) {
    let selectedDate = moment(dateStr, 'MMM dd, yyyy');
    if (selectedDate.isAfter(moment().startOf('day'))) {
      selectedDate = moment().startOf('day');
    }

    const { flux } = this.context;
    flux.getActions('date').setSelectedDate(selectedDate);
  },

  handleSubmit() {
    if (!this.state.canSubmit) { return; }

    for (let tracker of this.trackers) {
      if (tracker.canSubmit()) {
        tracker.doSubmit();
      }
    }
  }
});