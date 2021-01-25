var CreepsWay = require('Creeps.way');
const Flag = ['', 'C1_R', 'C2_R', 'C3_R']
var RoleCleaner = {
    run: function (creep) {
        let flag = Game.flags[Flag[creep.memory.id]];
        if (creep.room != flag.room) {
            creep.moveTo(flag);
            creep.say("赶路中");
            return;
        }
        if (creep.store.getUsedCapacity() == 0) {
            CreepsWay.CleanFlag(creep, flag);
        } else {
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_STORAGE ||
                            structure.structureType == STRUCTURE_LINK) &&
                        structure.store.getFreeCapacity() > 0
                }
            })
            creep.say("Cleaning!")
            CreepsWay.TransferTarget(creep, target);
        }
    }
}
module.exports = RoleCleaner