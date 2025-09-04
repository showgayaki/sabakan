use serde_derive::Deserialize;
use serde_derive::Serialize;

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct MenuTranslations {
    pub app: App,
    pub edit: Edit,
    pub help: Help,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct App {
    pub title: String,
    pub app_submenu: AppSubmenu,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct AppSubmenu {
    pub about: String,
    pub quit: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Edit {
    pub title: String,
    pub edit_submenu: EditSubmenu,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct EditSubmenu {
    pub undo: String,
    pub redo: String,
    pub cut: String,
    pub copy: String,
    pub paste: String,
    pub select_all: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Help {
    pub title: String,
    pub help_submenu: HelpSubmenu,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct HelpSubmenu {
    pub license: String,
    pub help: String,
}
