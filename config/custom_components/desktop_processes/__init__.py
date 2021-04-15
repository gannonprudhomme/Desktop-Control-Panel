""" The Desktop Processes integration. """
import logging
import asyncio
from datetime import timedelta
from typing import List

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, ServiceCall, callback
from homeassistant.helpers.entity_component import EntityComponent
from .desktop import Desktop, Process

from .const import DOMAIN, IGNORE, PRIORITY, ATTR_CONFIG

_LOGGER = logging.getLogger(__name__)

URL = "http://localhost:3001/"

SCANNING_INTERVAL = 5

desktops = []

@callback
async def _set_process_volume(call: ServiceCall):
    """ Handle the call """
    pid = call.data.get('pid')
    volume = call.data.get('volume')

    if pid is None or volume is None:
        raise Exception("pid is none!")
        return

    # We're assuming there's only 1 desktop at the moment
    desktop = desktops[0]
    await desktop.set_volume(pid, volume)

@asyncio.coroutine
async def async_setup(hass: HomeAssistant, config: dict):
    """ Set up the Desktop Processes component. """
    print("\nasync_setup\n")

    # Setup data so we can pass the config data to async_setup_entry
    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN] = {}
    hass.data[DOMAIN][ATTR_CONFIG] = config.get(DOMAIN)

    hass.services.async_register(DOMAIN, "set_process_volume", _set_process_volume)

    return True

async def async_setup_entry(hass: HomeAssistant, entry):
    """ Setup from config entry """
    print("\nasync_setup_entry\n")

    config_data = hass.data[DOMAIN].get(ATTR_CONFIG)

    # Setup priorities and ignore_list
    ignore_list = config_data.get(IGNORE)

    priority_settings = config_data.get(PRIORITY)
    priorities = {
        setting['name']: setting.get('priority') for setting in priority_settings
    }

    if not 'url' in entry.data:
        print("shit went wrong\n")
        return False

    url = entry.data.get('url')

    desktop = Desktop(URL, priorities, ignore_list)
    await desktop.connect()

    desktops.append(desktop)

    component = EntityComponent(None, DOMAIN, hass, timedelta(seconds=SCANNING_INTERVAL))
    await component.async_add_entities([desktop])

    return True
