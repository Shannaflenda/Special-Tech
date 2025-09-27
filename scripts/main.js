const tool = require("nsst/tool");

Events.on(UnitDestroyEvent, e => {
	
	const unit = e.unit;
	if (unit.team == Vars.player.team()) return;
	
	const maxHealth = tool.getUnitRealMaxHealth(unit, false);
	
	var a = 0;
	var b = 0;
	var c = 0;
	var d = 0;
	
	if (Vars.content.block("nsst-nucleus-soul-collecting").unlocked()) {
		a = Math.min(Math.floor(maxHealth / 10000), 100);
	}
	if (Vars.content.block("nsst-crystallized-soul-collecting").unlocked()) {
		b = Math.min(Math.floor(maxHealth / 1000), 100 - Math.ceil(a * 0.8));
	}
	if (Vars.content.block("nsst-crystallizing-soul-collecting").unlocked()) {
		c = Math.min(Math.floor(maxHealth / 100), 100 - Math.ceil((a + b) * 0.8));
	}
	if (Vars.content.block("nsst-uncrystallized-soul-collecting").unlocked()) {
		d = Math.min(Math.floor(maxHealth / 10), 100 - Math.ceil((a + b + c) * 0.8));
	}
	
	tool.addItem(Vars.player.team(), Vars.content.item("nsst-nucleus-soul"), a);
	tool.addItem(Vars.player.team(), Vars.content.item("nsst-crystallized-soul"), b);
	tool.addItem(Vars.player.team(), Vars.content.item("nsst-crystallizing-soul"), c);
	tool.addItem(Vars.player.team(), Vars.content.item("nsst-uncrystallized-soul"), d);
	
});