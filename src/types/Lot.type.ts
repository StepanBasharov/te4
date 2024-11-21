export type Lot = {
    id: number,
    lot_name: string,
    channel_id: number,
    user_id: number,
    winners_count: number,
    message_text_button: string,
    lot_type: number,
    members: number,
    check_sub: boolean,
    photo_path: string,
    date: string,
    lot_message_id: number,
    with_image: boolean,
}

export type ListOfLots = {
    lots: Lot[]
}