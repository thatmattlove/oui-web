package lib

import (
	"os"

	"github.com/stellaraf/go-utils/environment"
)

type Env struct {
	KV_URL      string `env:"KV_URL"`
	PopulateKey string `env:"POPULATE_KEY"`
}

func LoadEnv() (Env, error) {
	var env Env
	isVercel := os.Getenv("VERCEL") == "1" // if running in Vercel, value will be "1"
	isCI := os.Getenv("CI") == "true"      // if running in GitHub Actions, value will be "true"
	opts := &environment.EnvironmentOptions{
		DotEnv:    !isVercel && !isCI,
		FileNames: []string{".env.local"},
	}
	err := environment.Load(&env, opts)
	if err != nil {
		return env, err
	}
	return env, nil
}
