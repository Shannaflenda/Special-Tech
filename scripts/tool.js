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



module.exports = {
	getBulletMultiplier: getBulletMultiplier,
	getUnitRealMaxHealth: getUnitRealMaxHealth,
	getUnitRealHealth: getUnitRealHealth,
	setToast: setToast,
	addItem: addItem,
};
