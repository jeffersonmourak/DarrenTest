import React, { Component } from 'react';
import ForecastApi from '../Api/Forecast.api';
import WeatherApi from '../Api/Weather.api';
import { createDayData } from '../Helpers/forecast.helper';
import NotFound from '../Components/NotFound';
import Weather from '../Components/Weather';
import Loading from '../Components/Loading';

class WeatherPage extends Component {

  /**
   * Resolve Requests.
   * @async
   * 
   * @description
   * Handle the request for the data on the page.
   */
  async resolveRequests() {
    const data = { ...this.props.match.params };

    try {
      let [weather, forecast] = await Promise.all([WeatherApi.get(data), ForecastApi.get(data)]);

      this.props.loaded({
        weather,
        forecast: createDayData(forecast)
      });

    } catch (e) {
      if (e.status === 404) {
        this.props.notFound();
      }
    }
  }

  /**
   * Component Did Update
   * 
   * @description
   * Component lifecycle callback after update the state or props.
   * 
   * @param {Object} prevProps Previous component's props.
   */
  componentDidUpdate(prevProps) {
    if (prevProps.match.url !== this.props.match.url) {
      this.props.reset();
      this.resolveRequests();
    }
  }

  /**
   * Component Did Mount.
   * 
   * @description
   * Component lifecycle callback of mounting.
   */
  componentDidMount() {
    this.resolveRequests();
  }
  
  /**
   * Render.
   * 
   * @description
   * Renders the component.
   * 
   * @returns {React.Component} the component.
   */
  render() {
    if (this.props.page.error) {
      return <NotFound/>;
    } else if (this.props.page.ready) {
      return (
        <Weather forecast = { this.props.page.forecast } 
                 weather = { this.props.page.weather }
                 history = { this.props.history } />
      );
    } else {
      return <Loading/>;
    }
  }
}

export default WeatherPage;