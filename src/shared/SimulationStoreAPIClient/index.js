import axios from 'axios/index';
import {SIMULATION_STORE_AUTH_TOKEN} from "../../config";


class SimulationStoreaAPIClient {
  url: ?string = undefined;

  constructor(url: string) {
    this.url = url;
  }

  uploadSimulationResult(simulation_result: any) {
    return axios.post(this.url, {outcome: "success", simulation: simulation_result});
  }

  uploadSimulationError(simulation_id: string, error: any) {
    return axios.post(this.url, {id: simulation_id, outcome: "simulation_error", simulation: error});
  }

  getSimulation(simulation_id: string) {
	  return axios.get(this.url + "/" + simulation_id, {headers: {'Authentication-Token': SIMULATION_STORE_AUTH_TOKEN}});
  }

  getAllSimulations() {
	  return axios.get(this.url, {headers: {'Authentication-Token': SIMULATION_STORE_AUTH_TOKEN}});
  }
}

export default SimulationStoreaAPIClient;
