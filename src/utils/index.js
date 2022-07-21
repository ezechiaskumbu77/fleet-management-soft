import { useAppSelector } from '../hooks';

export function DriverToExport() {
	let { drivers, vehicles } = useAppSelector((state) => state.globalState);
	let exportColumns = [
    { title: "Nom", dataKey: "name" },
    { title: "Post Nom", dataKey: "lastName" },
    { title: "Véhicule Associé", dataKey: "vehicle" },
    { title: "licenseValidity", dataKey: "age" },
    { title: "Sexe", dataKey: "sex" },
    { title: "E - Mail", dataKey: "email" },
    { title: "Numero Téléphone", dataKey: "phone" },
  ];

	let dataFormat = [];

	for (let driver of drivers) {
		let vehName = '';
		let { name, lastName, age, sex, email, phone, id } = driver;
		for (vehicle of vehicles) {
			if (vehicle.idDriver === id) vehName = vehicle.name;
		}
		dataFormat.push({
			name,
			lastName,
			age,
			sex,
			email,
			phone,
			vehicle: vehName,
		});
	}

	return dataFormat;
}

export function GetDrivers() {
	let { drivers } = useAppSelector((state) => state.globalState);
	drivers = drivers.filter((dri) => dri.delete != true);
	let refactorDrivers = [];
	for (let i = 0; i < drivers.length; i++) {
		refactorDrivers.push({
			label: `${drivers[i].name}`,
			value: `${drivers[i].id}`,
		});
	}
	return refactorDrivers;
}

export function GetTypeVehicle() {
	let { typesVehicles } = useAppSelector((state) => state.globalState);
	let refactorTypesVehicles = [];
	for (let i = 0; i < typesVehicles.length; i++) {
		refactorTypesVehicles.push({
			label: `${typesVehicles[i].name}`,
			value: `${typesVehicles[i].id}`,
		});
	}
	return refactorTypesVehicles;
}

export function GetVehicles() {
	let { vehicles } = useAppSelector((state) => state.globalState);
	vehicles = vehicles.filter((veh) => veh.delete != true);
	let refactorVehicles = [];
	for (let i = 0; i < vehicles.length; i++) {
		refactorVehicles.push({
			label: `${vehicles[i].name}`,
			value: `${vehicles[i].id}`,
		});
	}
	return refactorVehicles;
}

export function GetResponsables() {
	let { responsables } = useAppSelector((state) => state.globalState);
	responsables = responsables.filter((res) => res.delete != true);
	let refactorResponsables = [];
	for (let i = 0; i < responsables.length; i++) {
		refactorResponsables.push({
			label: `${responsables[i].name}`,
			value: `${responsables[i].id}`,
		});
	}
	return refactorResponsables;
}

export function GetVehicleWithIdMap() {
	let { vehicles } = useAppSelector((state) => state.globalState);
	let refactorVehicles = [];
	for (let i = 0; i < vehicles.length; i++) {
		refactorVehicles.push({
			label: `${vehicles[i].name}`,
			value: `${vehicles[i].conduct}`,
		});
	}
	return refactorVehicles;
}

export async function PostImage(image) {
	let formData = new FormData();
	formData.append('file', image);
	formData.append('upload_preset', 'cps_fleets');

	let datas = await fetch(process.env.URL_ClOUDINARY, {
    method: "POST",
    body: formData,
  })
    .then((r) => r.json())
    .catch((er) => {
      throw new Error("Impossible d'envoyer la photo");
    });

	return datas;
}

export function ConvertRGBtoHex(red, green, blue) {
	function ColorToHex(color) {
		var hexadecimal = color.toString(16);
		return hexadecimal.length == 1 ? '0' + hexadecimal : hexadecimal;
	}
	return '#' + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
}

export function HexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
		JSON.parse(hex)
	);
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16),
		  }
		: null;
}

export function GetListYears() {
	let listYears = [];
	for (let i = new Date().getFullYear(); i >= 1940; i--) {
		listYears.push({
			label: `${i}`,
			value: `${i}`,
		});
	}
	return listYears;
}

export function GetYearsLicense() {
	let listYears = [];
	let limit = new Date().getFullYear() + 20;
	for (let i = new Date().getFullYear(); i <= limit; i++) {
		listYears.push({
			label: `${i}`,
			value: `${i}`,
		});
	}
	return listYears;
}

export function GetAges() {
	let listYears = [];
	for (let i = 20; i <= 75; i++) {
		listYears.push({
			label: `${i}`,
			value: `${i}`,
		});
	}
	return listYears;
}

export function GetSex() {
	return [
		{
			label: 'Homme',
			value: 'Homme',
		},
		{
			label: 'Femme',
			value: 'Femme',
		},
		{
			label: 'Pas de réponse',
			value: 'Pas de precision',
		},
	];
}

export function GetFrenchElementControl(element) {
	let list = [
		{
			name: 'honk',
			french: 'Klaxon',
		},
		{
			name: 'motor',
			french: 'Moteur',
		},
		{
			name: 'stopLight',
			french: 'Feux de stop',
		},
		{
			name: 'startUp',
			french: 'Démarrage',
		},
		{
			name: 'handBrake',
			french: 'Frein à main',
		},
		{
			name: 'stricken',
			french: 'Etrait - Avant',
		},
		{
			name: 'siegeState',
			french: 'État du siège',
		},
		{
			name: 'ceilingState',
			french: 'État du plafond',
		},
		{
			name: 'windshieldConditionAV',
			french: 'Etat pare-brise avant',
		},
		{
			name: 'windshieldConditionAR',
			french: 'Etat pare-brise arrière',
		},
		{
			name: 'carStateOut',
			french: 'État Exterieur du véhicule',
		},
		{
			name: 'carStateIn',
			french: 'État Interieur du véhicule',
		},
		{
			name: 'shockAbsorbersAV',
			french: 'Absorbeur de choc avant',
		},
		{
			name: 'shockAbsorbersAR',
			french: 'Absorbeur de choc arrière',
		},
		{
			name: 'brakingSystem',
			french: 'Système de freinage',
		},
		{
			name: 'radioAndReader',
			french: 'Radio et lecteur',
		},
		{
			name: 'reserveTire',
			french: 'Pneu de réserve',
		},
		{
			name: 'leftAndRightTireAR',
			french: 'Pneu arrière droit',
		},
		{
			name: 'leftAndRightTireAV',
			french: 'Pneu arrière gauche',
		},
		{
			name: 'gironfardOperation',
			french: 'Gironfard',
		},
		{
			name: 'flashingOperationAV',
			french: 'Flash avant',
		},
		{
			name: 'flashingOperationAR',
			french: 'Flash arrière',
		},
		{
			name: 'warningLightsOperation',
			french: 'Lumières de sécurité',
		},
		{
			name: 'windshieldWipers',
			french: 'Essuie-glaces ',
		},
		{
			name: 'mechanismOperation',
			french: 'Fonctionnement du Mécanisme',
		},
		{
			name: 'cric',
			french: 'Cric',
		},
		{
			name: 'wheelWrench',
			french: 'Clé de roue',
		},
		{
			name: 'cricRemover',
			french: 'Demonte cric',
		},
		{
			name: 'mileage',
			french: 'Kilométrage',
		},
		{
			name: 'dateVerification',
			french: 'Date de vérification',
		},
	];

	let elementFrench = list.find((item) => item.name === element);
	return elementFrench ? elementFrench.french : null;
}

export function GetYearBeginSystem() {
	let listYears = [];
	for (let i = 2021; i <= new Date().getFullYear(); i++) {
		listYears.push({
			label: `${i}`,
			value: `${i}`,
		});
	}
	return listYears;
}

export function GetMonthInFrench(month) {
	let listMonth = [
		{
			id: 1,
			value: 'Janvier',
		},
		{
			id: 2,
			value: 'Fevrier',
		},
		{
			id: 3,
			value: 'Mars',
		},
		{
			id: 4,
			value: 'Avril',
		},
		{
			id: 5,
			value: 'Mai',
		},
		{
			id: 6,
			value: 'Juin',
		},
		{
			id: 7,
			value: 'Juillet',
		},
		{
			id: 8,
			value: 'Aout',
		},
		{
			id: 9,
			value: 'Septembre',
		},
		{
			id: 10,
			value: 'Octobre',
		},
		{
			id: 11,
			value: 'Novembre',
		},
		{
			id: 12,
			value: 'Decembre',
		},
	];
	let monthFind = listMonth.find(({ id }) => parseInt(month) === id);
	return monthFind.value;
}

export function getDate(){
	let date = new Date();
 let year = date.getFullYear();
 let month = date.getMonth() + 1;
 let day = date.getDate();
 let dateNow = `${day}/${month}/${year}`;
  return dateNow;
}
