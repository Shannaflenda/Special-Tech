function getBulletMultiplier(bullet) {
	
	var mul = 1;
	
	if (bullet.owner instanceof Building) {
		mul = Vars.state.rules.blockDamage(bullet.team);
	}
	if (bullet.owner instanceof Unit) {
		mul = bullet.owner.damageMultiplier * Vars.state.rules.unitDamage(bullet.team);
	}
	return mul;
}

function getUnitRealMaxHealth(unit, considerStatus) {
	return unit.maxHealth * Vars.state.rules.unitHealth(unit.team) * (considerStatus ? unit.healthMultiplier : 1);
}

function getUnitRealHealth(unit, considerStatus) {
	return unit.health * Vars.state.rules.unitHealth(unit.team) * (considerStatus ? unit.healthMultiplier : 1);
}

function setToast(icon, string) {
	var index = 1;
	while (Core.bundle.getOrNull(string + "-" + index) != null) {
		Vars.ui.hudfrag.showToast(icon, Core.bundle.format(string + "-" + index));
		index = index + 1;
	}
}

function addItem(team, item, amount) {
	var core = team.core();
	core.items.add(item, Math.min(amount, core.storageCapacity - core.items.get(item)));
}

function addSec(sector, item, offset, addTimes) {
	
	const planet = sector.planet;
	const name = sector.name();
	
	var threat = sector.threat * 10;
	
	var capturedTimes = parseInt(Core.settings.getString(planet + "-" + name + "-capturedTimes", "0"));
	
	var adif = {
	}
	
	var fdif = threat - offset + (adif[sector.name()] != null ? adif[sector.name()] : 0);
	
	if (fdif < 1) return;
	
	var k = 0;
	
	if (fdif > 9) {
		k = 0.03;
	} else if (fdif > 3) {
		k = 0.5 - 0.05 * fdif;
	} else {
		k = 0.7 - 0.1 * fdif;
	}
	
	addItem(Vars.player.team(), item, Math.round(fdif + 2 * fdif * Math.exp(- k * capturedTimes)));
	
	if (addTimes) Core.settings.put(planet + "-" + name + "-capturedTimes", (capturedTimes + 1).toString());
}



module.exports = {
	getBulletMultiplier: getBulletMultiplier,
	getUnitRealMaxHealth: getUnitRealMaxHealth,
	getUnitRealHealth: getUnitRealHealth,
	setToast: setToast,
	addItem: addItem,
	addSec: addSec,
};
