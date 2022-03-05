import { VirtualHypixel } from "../classes/VirtualHypixel"
import { Client, PacketMeta } from "minecraft-protocol"
import { ModuleBase } from "./base/ModuleBase"

/**
 * Packet Filter Module
 * Filters out packets enabled in the config
 */
export class PacketFilter extends ModuleBase {

    constructor(client: Client, virtual: VirtualHypixel) {
        super("Packet Filter", "1.0.0", client, virtual);
    }

    onInPacket(meta: PacketMeta, data: any, toServer: Client): [boolean, any] {
        if (meta.name === "world_particles") return [this.virtual.config.packet.particles, data]

        if (data.data && data.data.toString().toLowerCase().includes("hypixel") && this.virtual.config.packet.enableMods) return [true, data]
        if (data.channel && data.channel === "badlion:mods" && this.virtual.config.packet.enableMods) return [true, data]

        return [false, data]
    }

}