package interfaces

import (
	"context"
	"crypto/tls"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/redis/go-redis/v9"
)

var (
	KEY_LAST_UPDATED string = "last-updated"
	KEY_NEXT_UPDATE  string = "next-update"
)

type KV struct {
	Redis *redis.Client
	Ctx   context.Context
}

func (kv *KV) GetLastUpdated() (time.Time, error) {
	res, err := kv.Redis.Get(kv.Ctx, KEY_LAST_UPDATED).Time()
	if err != nil {
		return time.Time{}, err
	}
	return res, nil
}

func (kv *KV) GetNextUpdate() (time.Time, error) {
	res, err := kv.Redis.Get(kv.Ctx, KEY_NEXT_UPDATE).Time()
	if err != nil {
		return time.Time{}, err
	}
	return res, nil
}

func (kv *KV) SetLastUpdated(date time.Time) error {
	next := date.Add(12 * time.Hour)
	_, err := kv.Redis.Set(kv.Ctx, KEY_LAST_UPDATED, date, -1).Result()
	if err != nil {
		return err
	}
	_, err = kv.Redis.Set(kv.Ctx, KEY_NEXT_UPDATE, next, -1).Result()
	if err != nil {
		return err
	}
	return nil
}

func NewKV(ctx *fiber.Ctx, kvURL string) (*KV, error) {
	opts, err := redis.ParseURL(kvURL)
	if err != nil {
		return nil, err
	}
	opts.TLSConfig = &tls.Config{}
	client := redis.NewClient(opts)
	if client == nil {
		return nil, fmt.Errorf("failed to initialize Redis client")
	}
	rctx := ctx.Context()
	_, err = client.Ping(rctx).Result()
	if err != nil {
		return nil, err
	}
	kv := &KV{
		Redis: client,
		Ctx:   rctx,
	}
	return kv, nil
}
