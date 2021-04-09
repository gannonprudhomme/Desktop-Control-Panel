""" The Desktop Processes integration. """
import asyncio
from datetime import timedelta

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, ServiceCall, callback
from homeassistant.helpers.entity_component import EntityComponent
# import socketio
from .desktop import Desktop, Process

# sio = socketio.AsyncClient()

from .const import DOMAIN

URL = "http://localhost:3001/"

SCANNING_INTERVAL = 5

@callback
def _set_process_volume(call: ServiceCall):
    """ Handle the call """
    # I guess they need to specify which desktop this is setting process volume for?
    print("set_process_volume")
    name = "some name"
    print(repr(call.data))

@asyncio.coroutine
async def async_setup(hass: HomeAssistant, config: dict):
    """ Set up the Desktop Processes component. """
    hass.data.setdefault(DOMAIN, {})
    print("\nasync_setup\n")

    hass.data[DOMAIN] = {
        "some stuff": "something else"
    }

    hass.services.async_register(DOMAIN, "set_process_volume", _set_process_volume)
    # hass.helpers.discovery.load_platform('light', DOMAIN, {}, config)

    # TODO: Add desktop dynamically
    return True

async def async_setup_entry(hass, entry):
    """ Setup from config entry """
    print("\nasync_setup_entry\n")
    print(entry)
    print(entry.data)

    if not 'url' in entry.data:
        print("shit went wrong\n")
        return False
    
    url = entry.data.get('url')
    print(f'{url}\n')

    desktop = Desktop(URL)
    await desktop.connect()
    component = EntityComponent(None, DOMAIN, hass, timedelta(seconds=SCANNING_INTERVAL))
    await component.async_add_entities([desktop])

    return True
